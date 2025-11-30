# Discord Webhook Setup for Consultation Requests

The pricing page now includes a consultation request feature that sends customer information directly to your Discord server.

## How to Set Up

### 1. Create a Discord Webhook

1. Open your Discord server
2. Go to **Server Settings** > **Integrations** > **Webhooks**
3. Click **New Webhook** or **Create Webhook**
4. Give it a name like "Consultation Requests"
5. Select the channel where you want to receive notifications
6. Click **Copy Webhook URL**

### 2. Add Webhook URL to Environment Variables

1. Open the `.env` file in the project root
2. Find the line: `VITE_DISCORD_WEBHOOK_URL=""`
3. Paste your webhook URL between the quotes:
   ```
   VITE_DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE"
   ```
4. Save the file
5. Restart your dev server if it's running

### 3. Test the Feature

1. Navigate to the pricing page: http://localhost:8080/pricing
2. Click **Get Started** on any package
3. Choose **Request a Free Consultation**
4. Fill in the form with test data
5. Submit the form
6. Check your Discord channel for the notification

## What Information is Sent?

When a customer requests a consultation, Discord will receive:

- **Package name** (e.g., "Starter", "Growth", "Premium")
- **Package price** (build cost + monthly fee)
- **Customer name**
- **Phone number**
- **Email address**
- **Timestamp** of when the request was made

## Example Discord Message

```
🎯 New Consultation Request

Package: Growth
Price: £1,250 + £55/mo

Customer Name: John Smith
Phone: 07123 456789
Email: john@example.com

Timestamp: 2025-11-29 10:30:45
```

## Troubleshooting

**Q: The form submits but I don't see anything in Discord**
- Check that your webhook URL is correct
- Make sure the webhook is active in Discord
- Check browser console for errors

**Q: Can I use this in production?**
- Yes! Just make sure to set the `VITE_DISCORD_WEBHOOK_URL` environment variable on your hosting platform

**Q: What if I don't set up the webhook?**
- The form will still show a success message to the customer
- You just won't receive the notification in Discord
- The data won't be stored anywhere

## Security Note

⚠️ **Never commit your webhook URL to Git!**

The `.env` file should already be in `.gitignore`. Always keep your webhook URLs secret to prevent spam.
