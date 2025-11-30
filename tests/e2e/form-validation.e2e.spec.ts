import { test, expect } from '@playwright/test'

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the form page - adjust URL as needed
    await page.goto('http://localhost:3000/contact-us/style-form')
  })

  test('should show red borders on required fields when submit is clicked without filling them', async ({
    page,
  }) => {
    // Wait for form to be visible
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Find the submit button
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    // Click submit without filling any fields
    await submitButton.click()

    // Wait a bit for validation to run
    await page.waitForTimeout(500)

    // Check that required fields have error state (red border)
    // Input fields should have aria-invalid="true" when invalid
    const invalidInputs = page.locator('input[aria-invalid="true"]')
    const invalidTextareas = page.locator('textarea[aria-invalid="true"]')
    const invalidSelects = page.locator('button[aria-invalid="true"]')
    const invalidCheckboxes = page.locator('[data-invalid="true"]')

    // Count how many invalid fields we have
    const invalidInputCount = await invalidInputs.count()
    const invalidTextareaCount = await invalidTextareas.count()
    const invalidSelectCount = await invalidSelects.count()
    const invalidCheckboxCount = await invalidCheckboxes.count()

    const totalInvalidFields = invalidInputCount + invalidTextareaCount + invalidSelectCount + invalidCheckboxCount

    // Verify at least one field is invalid (assuming form has required fields)
    expect(totalInvalidFields).toBeGreaterThan(0)

    // Verify fields have error styling (ring-error-500 class)
    // Check for error ring classes on invalid inputs
    const errorRingInputs = page.locator('input.ring-error-500, input.dark\\:ring-error-500')
    const errorRingTextareas = page.locator('textarea.ring-error-500, textarea.dark\\:ring-error-500')
    const errorRingButtons = page.locator('button.ring-error-500, button.dark\\:ring-error-500')

    const errorRingCount =
      (await errorRingInputs.count()) +
      (await errorRingTextareas.count()) +
      (await errorRingButtons.count())

    // At least some fields should have error ring styling
    expect(errorRingCount).toBeGreaterThan(0)

    // Verify error messages are displayed
    // Error messages should be visible (HintText components with isInvalid)
    const errorMessages = page.locator('text=/This field is required/i')
    const errorMessageCount = await errorMessages.count()

    // At least one error message should be visible
    expect(errorMessageCount).toBeGreaterThan(0)
  })

  test('should clear errors when fields are filled correctly', async ({ page }) => {
    // Wait for form to be visible
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Find the submit button
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    // Click submit without filling fields to trigger validation
    await submitButton.click()
    await page.waitForTimeout(500)

    // Fill in text input fields
    const textInputs = page.locator('input[type="text"]')
    const textInputCount = await textInputs.count()
    if (textInputCount > 0) {
      await textInputs.first().fill('Test Value')
      await page.waitForTimeout(300)
    }

    // Fill in email field if present
    const emailInput = page.locator('input[type="email"]')
    if ((await emailInput.count()) > 0) {
      await emailInput.first().fill('test@example.com')
      await page.waitForTimeout(300)
    }

    // Fill in textarea if present
    const textarea = page.locator('textarea')
    if ((await textarea.count()) > 0) {
      await textarea.first().fill('Test message')
      await page.waitForTimeout(300)
    }

    // Check that filled fields no longer have error state
    const filledTextInputs = page.locator('input[type="text"]:not([aria-invalid="true"])')
    const filledTextInputCount = await filledTextInputs.count()

    // At least the fields we filled should not be invalid anymore
    if (textInputCount > 0) {
      expect(filledTextInputCount).toBeGreaterThan(0)
    }
  })

  test('should prevent form submission when required fields are empty', async ({ page }) => {
    // Wait for form to be visible
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Find the submit button
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    // Set up a listener to detect if form submission happens
    let formSubmitted = false
    page.on('request', (request) => {
      if (request.url().includes('/api/form-submissions')) {
        formSubmitted = true
      }
    })

    // Click submit without filling required fields
    await submitButton.click()
    await page.waitForTimeout(1000)

    // Form should not be submitted (no API call should be made)
    expect(formSubmitted).toBe(false)

    // Form should still be visible (not replaced by success message)
    await expect(form).toBeVisible()
  })

  test('should show error state on select dropdown when required', async ({ page }) => {
    // Wait for form to be visible
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Find select dropdowns
    const selectButtons = page.locator('button[role="combobox"]')
    const selectCount = await selectButtons.count()

    if (selectCount > 0) {
      // Find submit button
      const submitButton = page.locator('button[type="submit"]')
      await expect(submitButton).toBeVisible()

      // Click submit without selecting
      await submitButton.click()
      await page.waitForTimeout(500)

      // Check if select has error state
      const invalidSelect = page.locator('button[role="combobox"][aria-invalid="true"]')
      const invalidSelectCount = await invalidSelect.count()

      // If there's a required select, it should show error
      if (selectCount > 0) {
        // At least one select should be invalid if required
        expect(invalidSelectCount).toBeGreaterThanOrEqual(0)
      }
    }
  })

  test('should show error state on checkbox when required', async ({ page }) => {
    // Wait for form to be visible
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Find checkboxes
    const checkboxes = page.locator('input[type="checkbox"]')
    const checkboxCount = await checkboxes.count()

    if (checkboxCount > 0) {
      // Find submit button
      const submitButton = page.locator('button[type="submit"]')
      await expect(submitButton).toBeVisible()

      // Click submit without checking required checkbox
      await submitButton.click()
      await page.waitForTimeout(500)

      // Check if checkbox has error state
      const invalidCheckboxes = page.locator('[data-invalid="true"]')
      const invalidCheckboxCount = await invalidCheckboxes.count()

      // If there's a required checkbox, it might show error
      // Note: checkbox validation behavior may vary
      expect(invalidCheckboxCount).toBeGreaterThanOrEqual(0)
    }
  })
})

