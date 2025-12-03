'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/uui/button'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  form: FormType
}

// Build defaultValues object from Payload fields array for react-hook-form
const buildDefaultValues = (formFields: FormFieldBlock[] | undefined): FieldValues => {
  const defaults: FieldValues = {}
  formFields?.forEach((field) => {
    if ('name' in field && field.name) {
      const existingDefault = 'defaultValue' in field ? field.defaultValue : undefined
      const blockType = 'blockType' in field ? field.blockType : undefined

      // Handle different field types with appropriate default values
      switch (blockType) {
        case 'select':
          // For React Aria Select: null = controlled with no selection
          defaults[field.name] = existingDefault ?? null
          break
        case 'checkbox':
          // Checkbox expects boolean, not empty string
          defaults[field.name] = existingDefault ?? false
          break
        case 'number':
          // Number fields: preserve existing default or use empty string (HTML number inputs accept '')
          // Converting to number if string number is provided
          if (existingDefault !== undefined && existingDefault !== null && existingDefault !== '') {
            defaults[field.name] =
              typeof existingDefault === 'string'
                ? parseFloat(existingDefault) || ''
                : existingDefault
          } else {
            defaults[field.name] = ''
          }
          break
        default:
          // Text-based fields (email, text, textarea, country, state, message)
          defaults[field.name] = existingDefault ?? ''
      }
    }
  })
  return defaults
}

// Safely serialize form values to JSON-safe primitives only
// Filters out DOM elements, functions, and circular references
const serializeFormValue = (value: unknown): string | number | boolean | null => {
  // Handle null and undefined
  if (value === null || value === undefined) {
    return null
  }

  // Handle primitives
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value
  }

  // Handle DOM elements - extract their value property
  if (typeof value === 'object' && value !== null) {
    // Check if it's a DOM element (has nodeType property)
    if ('nodeType' in value && typeof (value as any).nodeType === 'number') {
      const element = value as HTMLElement
      // Extract value from form elements
      if ('value' in element && typeof (element as any).value !== 'undefined') {
        return (element as any).value
      }
      // For other DOM elements, return empty string
      return ''
    }

    // Handle File objects
    if (value instanceof File) {
      return value.name
    }

    // Handle FileList
    if (value instanceof FileList) {
      return Array.from(value)
        .map((file) => file.name)
        .join(', ')
    }

    // Handle Date objects
    if (value instanceof Date) {
      return value.toISOString()
    }

    // Handle arrays - recursively serialize each item
    if (Array.isArray(value)) {
      const serialized = value.map((item) => serializeFormValue(item)).filter((v) => v !== null)
      return serialized.length > 0 ? serialized.join(', ') : ''
    }

    // For other objects, check if they have a value property (like form field objects)
    if ('value' in value && typeof (value as any).value !== 'undefined') {
      return serializeFormValue((value as any).value)
    }

    // Try to extract meaningful string representation
    try {
      // Check if it has a toString that's not the default
      const stringValue = String(value)
      if (stringValue !== '[object Object]') {
        return stringValue
      }
    } catch {
      // Ignore toString errors
    }

    // Last resort: try JSON.stringify with circular reference detection
    const seen = new WeakSet()
    try {
      const jsonString = JSON.stringify(value, (key, val) => {
        // Skip circular references
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) {
            return '[Circular]'
          }
          seen.add(val)
        }
        // Skip DOM elements
        if (val && typeof val === 'object' && 'nodeType' in val) {
          return '[DOM Element]'
        }
        // Skip functions
        if (typeof val === 'function') {
          return '[Function]'
        }
        return val
      })
      return jsonString
    } catch {
      // If all else fails, return empty string
      return ''
    }
  }

  // Fallback: convert to string (handles functions, symbols, etc.)
  try {
    return String(value)
  } catch {
    return ''
  }
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { form: formFromProps } = props

  // All hooks must be called before any conditional returns
  // Initialize with safe defaults that will be replaced if form exists
  const formMethods = useForm<FieldValues>({
    defaultValues:
      typeof formFromProps === 'object' && formFromProps?.fields
        ? buildDefaultValues(formFromProps.fields)
        : {},
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  // Extract form data safely (before early return)
  const formData = useMemo(() => {
    return typeof formFromProps === 'object' && formFromProps
      ? {
          id: formFromProps.id,
          confirmationMessage: formFromProps.confirmationMessage,
          confirmationType: formFromProps.confirmationType,
          redirect: formFromProps.redirect,
          submitButtonLabel: formFromProps.submitButtonLabel,
        }
      : null
  }, [formFromProps])

  const onError = useCallback(() => {
    // Validation failed - errors are handled by react-hook-form
  }, [])

  const onSubmit = useCallback(
    (data: FieldValues) => {
      if (!formData) return

      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data)
          .filter(([name]) => name && typeof name === 'string')
          .map(([name, value]) => ({
            field: name,
            value: serializeFormValue(value),
          }))
          .filter((item) => item.value !== undefined)

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formData.id,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          clearTimeout(loadingTimerID)

          // Safe JSON parsing with fallback for non-JSON responses
          let res: any = {}
          try {
            const text = await req.text()
            res = text ? JSON.parse(text) : {}
          } catch (parseError) {
            // Response is not JSON (e.g., HTML error page)
            console.error('Failed to parse response as JSON:', parseError)
            setIsLoading(false)
            setError({
              message: `Server error: ${req.statusText || 'Unknown error'}`,
              status: String(req.status),
            })
            return
          }

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || res.message || 'Internal Server Error',
              status: String(req.status),
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (formData.confirmationType === 'redirect' && formData.redirect) {
            const { url } = formData.redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.error('Form submission error:', err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          const errorMessage = err instanceof Error ? err.message : 'Something went wrong.'
          setError({
            message: errorMessage,
            status: '500',
          })
        }
      }

      void submitForm()
    },
    [router, formData],
  )

  // Early return if no form is selected or form is not populated
  // This must happen after all hooks are called
  if (!formFromProps || typeof formFromProps === 'string' || !formData) {
    return <div className="text-secondary-foreground">Please select a form in the admin panel.</div>
  }

  // Safe to destructure now that we know formFromProps is an object
  const { id: formID, confirmationMessage, confirmationType, submitButtonLabel } = formData

  return (
    <div>
      <FormProvider {...formMethods}>
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText data={confirmationMessage} />
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="mb-4 last:mb-0">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div className="mb-6 last:mb-0" key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  }
                  return null
                })}
            </div>

            <Button form={formID || ''} type="submit" color="accent" size="lg">
              {submitButtonLabel || 'Submit'}
            </Button>
          </form>
        )}
      </FormProvider>
    </div>
  )
}
