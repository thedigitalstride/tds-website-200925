'use client'

import {
  type ComponentType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  createContext,
  useContext,
} from 'react'
import { HelpCircle, InfoCircle } from '@untitledui/icons'
import type {
  InputProps as AriaInputProps,
  TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'
import {
  Group as AriaGroup,
  Input as AriaInput,
  TextField as AriaTextField,
} from 'react-aria-components'
import { HintText } from '@/components/uui/hint-text'
import { Label } from '@/components/uui/label'
import { Tooltip, TooltipTrigger } from '@/components/uui/tooltip'
import { cx, sortCx } from '@/utilities/cx'

export interface InputBaseProps extends TextFieldProps {
  /** Tooltip message on hover. */
  tooltip?: string
  /**
   * Input size.
   * @default "sm"
   */
  size?: 'sm' | 'md'
  /** Placeholder text. */
  placeholder?: string
  /** Class name for the icon. */
  iconClassName?: string
  /** Class name for the input. */
  inputClassName?: string
  /** Class name for the input wrapper. */
  wrapperClassName?: string
  /** Class name for the tooltip. */
  tooltipClassName?: string
  /** Keyboard shortcut to display. */
  shortcut?: string | boolean
  ref?: Ref<HTMLInputElement>
  groupRef?: Ref<HTMLDivElement>
  /** Icon component to display on the left side of the input. */
  icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>
}

export const InputBase = ({
  ref,
  tooltip,
  shortcut,
  groupRef,
  size = 'sm',
  isInvalid,
  isDisabled,
  icon: Icon,
  placeholder,
  wrapperClassName,
  tooltipClassName,
  inputClassName,
  iconClassName,
  // Omit this prop to avoid invalid HTML attribute warning
  isRequired: _isRequired,
  ...inputProps
}: Omit<InputBaseProps, 'label' | 'hint'>) => {
  // Check if the input has a leading icon or tooltip
  const hasTrailingIcon = tooltip || isInvalid
  const hasLeadingIcon = Icon

  // If the input is inside a `TextFieldContext`, use its context to simplify applying styles
  const context = useContext(TextFieldContext)

  const inputSize = context?.size || size

  const sizes = sortCx({
    sm: {
      root: cx('px-3 py-2', hasTrailingIcon && 'pr-9', hasLeadingIcon && 'pl-10'),
      iconLeading: 'left-3',
      iconTrailing: 'right-3',
      shortcut: 'pr-2.5',
    },
    md: {
      root: cx('px-3.5 py-2.5', hasTrailingIcon && 'pr-9.5', hasLeadingIcon && 'pl-10.5'),
      iconLeading: 'left-3.5',
      iconTrailing: 'right-3.5',
      shortcut: 'pr-3',
    },
  })

  return (
    <AriaGroup
      {...{ isDisabled, isInvalid }}
      ref={groupRef}
      className={({ isFocusWithin, isDisabled, isInvalid }) =>
        cx(
          'relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-white shadow-xs ring-2 ring-gray-300 dark:ring-white transition-shadow duration-100 ease-linear ring-inset',

          // Focus state (only when not invalid)
          isFocusWithin && !isDisabled && !isInvalid && 'ring-accent dark:ring-accent',

          // Disabled state styles
          isDisabled && 'cursor-not-allowed bg-gray-300 ring-gray-700 dark:ring-gray-700',
          'group-disabled:cursor-not-allowed group-disabled:bg-gray-300 group-disabled:ring-gray-700 dark:group-disabled:ring-gray-700',

          // Invalid state styles (always show error ring when invalid, even when focused)
          isInvalid && 'bg-error-100 ring-error-500 dark:ring-error-500',

          context?.wrapperClassName,
          wrapperClassName,
        )
      }
    >
      {/* Leading icon and Payment icon */}
      {Icon && (
        <Icon
          className={cx(
            'pointer-events-none absolute size-5 text-gray-400',
            isDisabled && 'text-fg-disabled',
            sizes[inputSize].iconLeading,
            context?.iconClassName,
            iconClassName,
          )}
        />
      )}

      {/* Input field */}
      <AriaInput
        {...(inputProps as AriaInputProps)}
        ref={ref}
        placeholder={placeholder}
        className={cx(
          'm-0 w-full bg-transparent text-md text-gray-900 dark:text-gray-900 ring-0 outline-hidden rounded-lg placeholder:text-gray-500 dark:placeholder:text-gray-500 autofill:rounded-lg autofill:shadow-[inset_0_0_0px_1000px_white] autofill:[-webkit-text-fill-color:rgb(17,24,39)]',
          isDisabled && 'cursor-not-allowed text-disabled',
          sizes[inputSize].root,
          context?.inputClassName,
          inputClassName,
        )}
      />

      {/* Tooltip and help icon */}
      {tooltip && !isInvalid && (
        <Tooltip title={tooltip} placement="top">
          <TooltipTrigger
            className={cx(
              'absolute cursor-pointer text-gray-400 transition duration-200 hover:text-gray-500 focus:text-gray-500',
              sizes[inputSize].iconTrailing,
              context?.tooltipClassName,
              tooltipClassName,
            )}
          >
            <HelpCircle className="size-4" />
          </TooltipTrigger>
        </Tooltip>
      )}

      {/* Invalid icon */}
      {isInvalid && (
        <InfoCircle
          className={cx(
            'pointer-events-none absolute size-4 text-error-500',
            sizes[inputSize].iconTrailing,
            context?.tooltipClassName,
            tooltipClassName,
          )}
        />
      )}

      {/* Shortcut */}
      {shortcut && (
        <div
          className={cx(
            'pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8',
            sizes[inputSize].shortcut,
          )}
        >
          <span
            className={cx(
              'pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset',
              isDisabled && 'bg-transparent text-disabled',
            )}
            aria-hidden="true"
          >
            {typeof shortcut === 'string' ? shortcut : '⌘K'}
          </span>
        </div>
      )}
    </AriaGroup>
  )
}

InputBase.displayName = 'InputBase'

interface BaseProps {
  /** Label text for the input */
  label?: string
  /** Helper text displayed below the input */
  hint?: ReactNode
}

interface TextFieldProps
  extends BaseProps,
    AriaTextFieldProps,
    Pick<
      InputBaseProps,
      'size' | 'wrapperClassName' | 'inputClassName' | 'iconClassName' | 'tooltipClassName'
    > {
  ref?: Ref<HTMLDivElement>
}

const TextFieldContext = createContext<TextFieldProps>({})

export const TextField = ({ className, ...props }: TextFieldProps) => {
  return (
    <TextFieldContext.Provider value={props}>
      <AriaTextField
        {...props}
        data-input-wrapper
        className={(state) =>
          cx(
            'group flex h-max w-full flex-col items-start justify-start gap-1.5',
            typeof className === 'function' ? className(state) : className,
          )
        }
      />
    </TextFieldContext.Provider>
  )
}

TextField.displayName = 'TextField'

interface InputProps extends InputBaseProps, BaseProps {
  /** Whether to hide required indicator from label */
  hideRequiredIndicator?: boolean
}

export const Input = ({
  size = 'sm',
  placeholder,
  icon: Icon,
  label,
  hint,
  shortcut,
  hideRequiredIndicator,
  className,
  ref,
  groupRef,
  tooltip,
  iconClassName,
  inputClassName,
  wrapperClassName,
  tooltipClassName,
  ...props
}: InputProps) => {
  return (
    <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
      {({ isRequired, isInvalid, isDisabled }) => (
        <>
          {label && (
            <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>
              {label}
            </Label>
          )}

          <InputBase
            {...props}
            {...{
              ref,
              groupRef,
              size,
              placeholder,
              icon: Icon,
              shortcut,
              iconClassName,
              inputClassName,
              wrapperClassName,
              tooltipClassName,
              tooltip,
              isInvalid,
              isDisabled,
            }}
          />

          {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
        </>
      )}
    </TextField>
  )
}

Input.displayName = 'Input'
