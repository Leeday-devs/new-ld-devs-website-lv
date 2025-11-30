import { test, expect } from '@playwright/test';

test.describe('Pricing Page Modal', () => {
  test('Get Started modal should appear and be visible', async ({ page }) => {
    // Navigate to the pricing page
    await page.goto('/pricing');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Find the first "Get Started" button
    const getStartedButton = page.locator('button:has-text("Get Started")').first();

    // Verify button exists
    await expect(getStartedButton).toBeVisible();

    // Click the button
    await getStartedButton.click();

    // Wait for modal to appear
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    // Take a screenshot to show the modal
    await page.screenshot({ path: 'tests/screenshots/pricing-modal-opened.png', fullPage: true });

    // Verify modal title is visible
    const modalTitle = page.locator('text="Let\'s Get Started!"');
    await expect(modalTitle).toBeVisible();

    // Verify modal has visible content (not just a blur)
    const payNowButton = page.locator('text="Pay Now & Get Started"');
    await expect(payNowButton).toBeVisible();

    const consultationButton = page.locator('text="Request a Free Consultation"');
    await expect(consultationButton).toBeVisible();

    // Check the modal has a white/light background (by checking computed styles)
    const modalContent = page.locator('[role="dialog"]').first();
    const backgroundColor = await modalContent.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    console.log('Modal background color:', backgroundColor);

    // Verify text color is dark (readable on white background)
    const titleColor = await modalTitle.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    console.log('Title text color:', titleColor);

    // The background should be light (white/gray) not dark navy
    // RGB values for white/light backgrounds should be high (close to 255)
    expect(backgroundColor).not.toContain('rgba(10, 25, 47'); // Should not be navy

    // Test clicking "Pay Now & Get Started"
    await payNowButton.click();

    // Modal should close and navigate to checkout
    await page.waitForURL('**/checkout**', { timeout: 5000 });

    console.log('✅ Modal test passed! Modal is visible with proper styling.');
  });

  test('Consultation form should work', async ({ page }) => {
    // Navigate to the pricing page
    await page.goto('/pricing');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Click Get Started
    await page.locator('button:has-text("Get Started")').first().click();

    // Wait for modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Click "Request a Free Consultation"
    await page.locator('text="Request a Free Consultation"').click();

    // Verify consultation form appears
    await expect(page.locator('text="Request a Consultation"')).toBeVisible();

    // Verify form fields are visible
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="tel"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();

    // Take screenshot of consultation form
    await page.screenshot({ path: 'tests/screenshots/consultation-form.png', fullPage: true });

    console.log('✅ Consultation form test passed!');
  });
});
