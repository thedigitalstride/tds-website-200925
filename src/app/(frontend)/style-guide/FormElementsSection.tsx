"use client";

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Text } from '@/blocks/Form/Text';
import { Email } from '@/blocks/Form/Email';
import { Textarea } from '@/blocks/Form/Textarea';
import { Number as NumberField } from '@/blocks/Form/Number';
import { Select } from '@/blocks/Form/Select';
import { Checkbox } from '@/blocks/Form/Checkbox';

interface FormData {
  text_default: string;
  text_required: string;
  text_error: string;
  email_default: string;
  email_required: string;
  email_error: string;
  textarea_default: string;
  textarea_required: string;
  textarea_rows: string;
  number_default: number;
  number_required: number;
  select_default: string;
  select_required: string;
  checkbox_default: boolean;
  checkbox_required: boolean;
}

export function FormElementsSection() {
  const methods = useForm<FormData>({
    defaultValues: {
      text_default: '',
      text_required: '',
      text_error: '',
      email_default: '',
      email_required: '',
      email_error: 'invalid@',
      textarea_default: '',
      textarea_required: '',
      textarea_rows: '',
      number_default: 0,
      number_required: 0,
      select_default: '',
      select_required: '',
      checkbox_default: false,
      checkbox_required: false,
    },
  });

  const { register, control } = methods;

  // Cast to expected types for Payload form components (to avoid strict type checking issues in demo)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedRegister = register as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedControl = control as any;

  // Simulate errors for demonstration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const demoErrors: any = {
    text_error: { message: 'This field has an error' },
    email_error: { message: 'Please enter a valid email' },
  };

  return (
    <FormProvider {...methods}>
      <section id="forms">
        <h2 className="text-display-md font-semibold text-primary mb-8">Form Elements</h2>
        <p className="text-md text-secondary mb-8 max-w-3xl">
          All form elements are integrated with Payload CMS and react-hook-form. These components use UntitledUI&apos;s accessible react-aria-components foundation with built-in validation states, proper labeling, and error handling.
        </p>

        {/* Text Inputs */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Text Inputs</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State</h4>
              <div className="max-w-md">
                <Text
                  blockType="text"
                  name="text_default"
                  label="First Name"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Text name="firstName" label="First Name" register={typedRegister} errors={errors} required={false} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Standard text input with label. Size is <code className="text-brand-secondary">md</code> (medium) by default.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <Text
                  blockType="text"
                  name="text_required"
                  label="Last Name"
                  register={typedRegister}
                  errors={{}}
                  required={true}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Text name="lastName" label="Last Name" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Required fields show an asterisk (*) in the label to indicate mandatory input.
              </p>
            </div>

            {/* Error State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Error State</h4>
              <div className="max-w-md">
                <Text
                  blockType="text"
                  name="text_error"
                  label="Username"
                  register={typedRegister}
                  errors={demoErrors}
                  required={true}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Text name="username" label="Username" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Error state shows red border and displays validation message below the field.
              </p>
            </div>
          </div>
        </div>

        {/* Email Inputs */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Email Inputs</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State</h4>
              <div className="max-w-md">
                <Email
                  blockType="email"
                  name="email_default"
                  label="Email Address"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Email name="email" label="Email Address" register={typedRegister} errors={errors} required={false} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Email input with mail icon. Includes built-in email validation pattern.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <Email
                  blockType="email"
                  name="email_required"
                  label="Work Email"
                  register={typedRegister}
                  errors={{}}
                  required={true}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Email name="workEmail" label="Work Email" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
            </div>

            {/* Error State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Error State (Invalid Email)</h4>
              <div className="max-w-md">
                <Email
                  blockType="email"
                  name="email_error"
                  label="Contact Email"
                  register={typedRegister}
                  errors={demoErrors}
                  required={true}
                  width={100}
                  defaultValue="invalid@"
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Email name="contactEmail" label="Contact Email" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Email validation checks pattern: <code className="text-brand-secondary">/^\S[^\s@]*@\S+$/</code>
              </p>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Textarea</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State (3 rows)</h4>
              <div className="max-w-md">
                <Textarea
                  blockType="text"
                  name="textarea_default"
                  label="Message"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                  rows={3}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Textarea name="message" label="Message" register={typedRegister} errors={errors} required={false} width={100} rows={3} />`}
              </code>
              <p className="text-sm text-tertiary">
                Multi-line text input. Default is 3 rows, but can be customized with <code className="text-brand-secondary">rows</code> prop.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <Textarea
                  blockType="text"
                  name="textarea_required"
                  label="Description"
                  register={typedRegister}
                  errors={{}}
                  required={true}
                  width={100}
                  rows={4}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Textarea name="description" label="Description" register={typedRegister} errors={errors} required={true} width={100} rows={4} />`}
              </code>
            </div>

            {/* Custom Rows */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Custom Height (8 rows)</h4>
              <div className="max-w-md">
                <Textarea
                  blockType="text"
                  name="textarea_rows"
                  label="Long Form Content"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                  rows={8}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Textarea name="content" label="Long Form Content" register={typedRegister} errors={errors} required={false} width={100} rows={8} />`}
              </code>
              <p className="text-sm text-tertiary">
                Larger textarea for longer content. Includes custom resize handle indicator.
              </p>
            </div>
          </div>
        </div>

        {/* Number Inputs */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Number Inputs</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State</h4>
              <div className="max-w-md">
                <NumberField
                  blockType="text"
                  name="number_default"
                  label="Age"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Number name="age" label="Age" register={typedRegister} errors={errors} required={false} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Number input with browser native increment/decrement controls.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <NumberField
                  blockType="text"
                  name="number_required"
                  label="Quantity"
                  register={typedRegister}
                  errors={{}}
                  required={true}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Number name="quantity" label="Quantity" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
            </div>
          </div>
        </div>

        {/* Select Dropdowns */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Select Dropdowns</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State</h4>
              <div className="max-w-md">
                <Select
                  blockType="select"
                  name="select_default"
                  label="Country"
                  control={typedControl}
                  errors={{}}
                  required={false}
                  width={100}
                  options={[
                    { label: 'United States', value: 'us' },
                    { label: 'United Kingdom', value: 'uk' },
                    { label: 'Canada', value: 'ca' },
                    { label: 'Australia', value: 'au' },
                  ]}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Select
                  blockType="select"
  name="country"
  label="Country"
  control={typedControl}
  errors={errors}
  required={false}
  width={100}
  options={[
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
  ]}
/>`}
              </code>
              <p className="text-sm text-tertiary">
                React Aria select component with accessible keyboard navigation and ARIA attributes.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <Select
                  blockType="select"
                  name="select_required"
                  label="Role"
                  control={typedControl}
                  errors={{}}
                  required={true}
                  width={100}
                  options={[
                    { label: 'Administrator', value: 'admin' },
                    { label: 'Editor', value: 'editor' },
                    { label: 'Author', value: 'author' },
                    { label: 'Viewer', value: 'viewer' },
                  ]}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Select
                  blockType="select"
  name="role"
  label="Role"
  control={typedControl}
  errors={errors}
  required={true}
  width={100}
  options={[
    { label: 'Administrator', value: 'admin' },
    { label: 'Editor', value: 'editor' },
  ]}
/>`}
              </code>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Checkboxes</h3>
          <div className="space-y-8">
            {/* Default State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Default State</h4>
              <div className="max-w-md">
                <Checkbox
                  blockType="checkbox"
                  name="checkbox_default"
                  label="Subscribe to newsletter"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Checkbox name="subscribe" label="Subscribe to newsletter" register={typedRegister} errors={errors} required={false} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Checkbox with label. Uses <code className="text-brand-secondary">md</code> size by default.
              </p>
            </div>

            {/* Required State */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-secondary">Required State</h4>
              <div className="max-w-md">
                <Checkbox
                  blockType="checkbox"
                  name="checkbox_required"
                  label="I agree to the terms and conditions"
                  register={typedRegister}
                  errors={{}}
                  required={true}
                  width={100}
                />
              </div>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
                {`<Checkbox name="terms" label="I agree to the terms and conditions" register={typedRegister} errors={errors} required={true} width={100} />`}
              </code>
              <p className="text-sm text-tertiary">
                Required checkbox shows asterisk (*) after the label text.
              </p>
            </div>
          </div>
        </div>

        {/* Width Variants */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Width Variants</h3>
          <div className="space-y-6">
            <p className="text-md text-secondary">
              All form fields support width control through the <code className="text-brand-secondary">width</code> prop, which wraps fields in a <code className="text-brand-secondary">Width</code> component.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Text
                  blockType="text"
                  name="width_50"
                  label="50% Width"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={50}
                />
              </div>
              <div className="space-y-2">
                <Text
                  blockType="text"
                  name="width_75"
                  label="75% Width"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={75}
                />
              </div>
              <div className="space-y-2">
                <Text
                  blockType="text"
                  name="width_100"
                  label="100% Width (Default)"
                  register={typedRegister}
                  errors={{}}
                  required={false}
                  width={100}
                />
              </div>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<Text name="field" label="Label" register={typedRegister} errors={errors} required={false} width={50} />
<Text name="field" label="Label" register={typedRegister} errors={errors} required={false} width={75} />
<Text name="field" label="Label" register={typedRegister} errors={errors} required={false} width={100} />`}
            </code>
          </div>
        </div>

        {/* Integration Notes */}
        <div className="border-t border-secondary pt-12">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Integration Notes</h3>
          <div className="bg-secondary p-6 rounded-lg space-y-4">
            <div>
              <h4 className="text-md font-semibold text-primary mb-2">React Hook Form Integration</h4>
              <p className="text-md text-secondary mb-2">
                All form components are fully integrated with react-hook-form using proper event handler patterns:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-tertiary">
                <li>Destructured register props to avoid react-aria conflicts</li>
                <li>Custom onChange handlers that bridge react-hook-form and react-aria</li>
                <li>Proper ref forwarding for form validation</li>
                <li>Controller-based integration for Select component</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-primary">
              <h4 className="text-md font-semibold text-primary mb-2">Accessibility Features</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-tertiary">
                <li>Built on react-aria-components for WAI-ARIA compliance</li>
                <li>Keyboard navigation support (Tab, Arrow keys, Enter, Escape)</li>
                <li>Screen reader announcements for validation states</li>
                <li>Focus management and visible focus indicators</li>
                <li>Proper label associations and ARIA attributes</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-primary">
              <h4 className="text-md font-semibold text-primary mb-2">Payload CMS Integration</h4>
              <p className="text-md text-secondary">
                These components are used in Payload&apos;s form builder plugin and can be found in:
              </p>
              <code className="block mt-2 text-xs text-brand-secondary">
                src/blocks/Form/[Text|Email|Textarea|Number|Select|Checkbox]/index.tsx
              </code>
            </div>
          </div>
        </div>

      </section>
    </FormProvider>
  );
}
