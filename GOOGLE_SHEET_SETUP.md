# 🌸 Ajay & Anupama Wedding • Google Sheets RSVP Setup Guide

This guide explains how to connect your website's RSVP form directly to a **Google Sheet** equipped with an **Executive Dashboard** (tracking Total Responses, Attending Guests, Ceremony Attendance, Confirmation Rate, and Regretfully Declined guests).

---

### ⏱️ Quick Setup (Takes ~1 Minute):

#### Step 1: Create Your Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Rename the spreadsheet at the top left to: `Ajay & Anupama Wedding RSVPs`.
3. Rename the active sheet tab at the bottom from `Sheet1` to: **`RSVP Responses`**.

#### Step 2: Open Apps Script
1. In the Google Sheets top menu bar, click **Extensions** > **Apps Script**.
2. Delete any default code in the editor (`function myFunction() { ... }`).

#### Step 3: Paste the Master Script
1. Open [`google-sheet-script.gs`](./google-sheet-script.gs) in this repository.
2. Copy all code and paste it into the Apps Script editor.
3. Click the 💾 **Save** icon (or press `Ctrl + S`).

#### Step 4: Run `setupSheet`
1. In the toolbar at the top of Apps Script, click the function dropdown (it may show `doPost`).
2. Select **`setupSheet`**.
3. Click **▶ Run**.
4. When Google displays **Authorization Required**:
   - Click **Review permissions**.
   - Choose your Google Account.
   - Click **Advanced** (bottom left of popup).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
5. Switch back to your Google Sheet:
   - Your **Royal Maroon & Gold Executive Dashboard** will appear with live formulas and a sample guest entry!

#### Step 5: Deploy as Webhook
1. In Apps Script, click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon ⚙️ (Select type) > choose **Web app**.
3. Configure the fields:
   - **Description**: `Ajay & Anupama RSVP Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: Must be "Anyone" so guests' browsers can submit RSVPs without requiring a Google login)*.
4. Click **Deploy**.
5. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

#### Step 6: Connect to Website
Paste your Web App URL into `src/data/wedding-data.ts`:
```typescript
rsvp: {
  enabled: true,
  googleSheetWebhookUrl: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",
  // ...
}
```
All RSVP submissions from the live website are now automatically recorded and updated directly in your Google Sheet in real time!
