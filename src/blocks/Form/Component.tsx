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
      // For select fields, use null (not '') so React Aria Select stays controlled
      // In React Aria: undefined = uncontrolled, null = controlled with no selection
      if ('blockType' in field && field.blockType === 'select') {
        defaults[field.name] = existingDefault || null
      } else {
        defaults[field.name] = existingDefault || ''
      }
    }
  })
  return defaults
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
    defaultValues: typeof formFromProps === 'object' && formFromProps?.fields 
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

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

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

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
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
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
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
