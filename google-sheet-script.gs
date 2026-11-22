/**
 * =======================================================================
 * 🌸 AJAY & ANUPAMA WEDDING • GOOGLE SHEETS RSVP SETUP SCRIPT 🌸
 * =======================================================================
 * 
 * FEATURES:
 * 1. ROYAL MAROON & GOLD EXECUTIVE DASHBOARD (Rows 1–3):
 *    - Total Responses: COUNTA(B8:B)
 *    - Total Attending Guests: SUM(D8:D)
 *    - Marriage / Sumuhurtham Attendees: COUNTIFS(E8:E, "Attending", F8:F, "*Marriage*")
 *    - Pellikoduku / Pellikuturu Attendees: COUNTIFS(E8:E, "Attending", F8:F, "*Pellikoduku*")
 *    - Haldi Ceremony Attendees: COUNTIFS(E8:E, "Attending", F8:F, "*Haldi*")
 *    - Declined Count: COUNTIF(E8:E, "Declined")
 * 
 * 2. STRUCTURED GUEST DATA (Rows 7+):
 *    - Col A: Timestamp
 *    - Col B: Guest / Family Name
 *    - Col C: Phone / WhatsApp Number
 *    - Col D: Total Guests
 *    - Col E: Attendance Status (Attending / Declined)
 *    - Col F: Ceremonies Attending
 *    - Col G: Wishes & Blessings
 * 
 * 3. SMART IN-PLACE ROW EDITING:
 *    - When a guest updates their response on the website, it locates their existing
 *      row by phone or name and updates that EXACT row in-place!
 *    - Prevents duplicates and keeps dashboard totals 100% accurate.
 * 
 * =======================================================================
 * HOW TO SET UP (Takes ~1 minute):
 * 1. Open Google Sheets (https://sheets.new)
 *    Rename the active sheet tab at the bottom to: "RSVP Responses"
 * 2. In Google Sheets top menu, click Extensions > Apps Script.
 * 3. Delete any default code in Code.gs, and PASTE THIS ENTIRE SCRIPT.
 * 4. Press Ctrl + S to save.
 * 5. In the toolbar at the top, select the function "setupSheet" from the dropdown.
 * 6. Click "Run" (▶).
 *    - If Google asks for permissions: Click "Review permissions" -> Select your account ->
 *      Click "Advanced" -> Click "Go to Untitled project (unsafe)" -> Click "Allow".
 *    - You will see the Royal Maroon & Gold Executive Dashboard appear in your sheet!
 * 7. Click the blue "Deploy" button (top right) > "New deployment".
 *    - Click gear icon (Select type) > Choose "Web app".
 *    - Description: "Ajay & Anupama RSVP Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself")
 *    - Click "Deploy".
 * 8. Copy the Web App URL (starts with https://script.google.com/macros/s/.../exec).
 * 9. Paste this URL into `googleSheetWebhookUrl` in `src/data/wedding-data.ts`!
 * =======================================================================
 */

var SHEET_NAME = "RSVP Responses";

var HEADERS = [
  "Timestamp",
  "Guest / Family Name",
  "Phone / WhatsApp Number",
  "Total Guests",
  "Attendance Status",
  "Ceremonies Attending",
  "Wishes & Blessings"
];

/**
 * Normalizes phone numbers to digits only for accurate matching
 */
function cleanPhone(p) {
  if (!p) return "";
  return String(p).replace(/\D/g, "");
}

/**
 * Normalizes text for clean comparison
 */
function cleanText(t) {
  if (!t) return "";
  return String(t).trim().toLowerCase();
}

/**
 * Searches the sheet to find an existing row for this guest.
 * Returns the 1-based row number if found, or -1 if new.
 */
function findExistingRowIndex(sheet, data, startRow) {
  var lastRow = sheet.getLastRow();
  if (lastRow < startRow) return -1;

  var numRows = lastRow - startRow + 1;
  var values = sheet.getRange(startRow, 2, numRows, 2).getValues();

  var targetPhone = cleanPhone(data.phone || data.contact || data.tel);
  var targetName = cleanText(data.name || data.fullName);

  // 1. Primary check: Phone match
  if (targetPhone && targetPhone.length >= 7) {
    for (var i = values.length - 1; i >= 0; i--) {
      var rowPhone = cleanPhone(values[i][1]); // Col C
      if (rowPhone && rowPhone.length >= 7) {
        if (rowPhone.slice(-10) === targetPhone.slice(-10)) {
          return startRow + i;
        }
      }
    }
  }

  // 2. Secondary check: Exact Name match
  if (targetName && targetName.length >= 3) {
    for (var j = values.length - 1; j >= 0; j--) {
      var rowName = cleanText(values[j][0]); // Col B
      if (rowName === targetName) {
        return startRow + j;
      }
    }
  }

  return -1;
}

/**
 * Handles POST requests from the website RSVP form
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (lockErr) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Server busy, please retry" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = setupSheet();
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var timestamp = Utilities.formatDate(now, "Asia/Kolkata", "dd MMM yyyy, hh:mm a");

    var name = (data.fullName || data.name || "").trim();
    var phone = (data.phone || data.contact || "").trim();
    var status = (data.status || data.attendance || "Attending").trim();
    if (status.toLowerCase().indexOf("attend") !== -1 || status.toLowerCase().indexOf("accept") !== -1) {
      status = "Attending";
    } else if (status.toLowerCase().indexOf("declin") !== -1) {
      status = "Declined";
    }

    var guests = 0;
    if (status === "Attending") {
      guests = parseInt(data.guestCount || data.guests || "1", 10);
      if (isNaN(guests) || guests < 1) guests = 1;
    }

    var eventsAttending = (data.events || data.ceremonies || "").trim();
    if (Array.isArray(data.events)) {
      eventsAttending = data.events.join(", ");
    }
    if (status === "Declined") {
      eventsAttending = "—";
    }

    var wishes = (data.message || data.wishes || "").trim();

    var DATA_START_ROW = 8;
    var existingRow = findExistingRowIndex(sheet, data, DATA_START_ROW);

    if (existingRow > 0) {
      // Update existing row
      sheet.getRange(existingRow, 1, 1, 7).setValues([[
        timestamp + " (Updated)",
        name,
        phone || sheet.getRange(existingRow, 3).getValue(),
        guests,
        status,
        eventsAttending,
        wishes
      ]]);
      formatDataRow(sheet, existingRow, status);
    } else {
      // Append new row
      var nextRow = Math.max(sheet.getLastRow() + 1, DATA_START_ROW);
      sheet.getRange(nextRow, 1, 1, 7).setValues([[
        timestamp,
        name,
        phone,
        guests,
        status,
        eventsAttending,
        wishes
      ]]);
      formatDataRow(sheet, nextRow, status);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", action: existingRow > 0 ? "updated" : "created" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check endpoint
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      wedding: "Ajay & Anupama Wedding Celebration",
      muhurtham: "12 December 2026 • 8:26 PM",
      venue: "GK Convention Hall, Eluru"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Styles individual guest rows
 */
function formatDataRow(sheet, row, status) {
  var range = sheet.getRange(row, 1, 1, 7);
  range.setFontFamily("Plus Jakarta Sans");
  range.setFontSize(10);
  range.setVerticalAlignment("middle");

  var statusCell = sheet.getRange(row, 5);
  statusCell.setHorizontalAlignment("center");
  statusCell.setFontWeight("bold");

  if (status === "Attending") {
    statusCell.setBackground("#E8F5E9");
    statusCell.setFontColor("#1B5E20");
  } else {
    statusCell.setBackground("#FFEBEE");
    statusCell.setFontColor("#B71C1C");
  }

  sheet.getRange(row, 4).setHorizontalAlignment("center");
}

/**
 * Master Setup Function: Builds the Royal Maroon & Gold Executive Dashboard
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
  }

  sheet.clear();

  // Row Heights
  sheet.setRowHeight(1, 45); // Title Header
  sheet.setRowHeight(2, 28); // Dashboard Metric Labels
  sheet.setRowHeight(3, 38); // Dashboard Metric Numbers
  sheet.setRowHeight(4, 14); // Spacer
  sheet.setRowHeight(5, 14); // Spacer
  sheet.setRowHeight(6, 20); // Section Header
  sheet.setRowHeight(7, 34); // Table Column Headers

  // Column Widths
  sheet.setColumnWidth(1, 170); // Timestamp
  sheet.setColumnWidth(2, 230); // Name
  sheet.setColumnWidth(3, 170); // Phone
  sheet.setColumnWidth(4, 110); // Guests
  sheet.setColumnWidth(5, 140); // Status
  sheet.setColumnWidth(6, 260); // Ceremonies
  sheet.setColumnWidth(7, 320); // Wishes

  // 1. MASTER TITLE HEADER (Row 1)
  var titleRange = sheet.getRange("A1:G1");
  titleRange.merge();
  titleRange.setValue("🌸  AJAY & ANUPAMA WEDDING • EXECUTIVE RSVP DASHBOARD  🌸");
  titleRange.setBackground("#520C1C"); // Deep Royal Maroon
  titleRange.setFontColor("#FFE5A3"); // Bright Gold
  titleRange.setFontFamily("Cinzel");
  titleRange.setFontSize(14);
  titleRange.setFontWeight("bold");
  titleRange.setHorizontalAlignment("center");
  titleRange.setVerticalAlignment("middle");

  // 2. DASHBOARD KPI TILES (Rows 2–3)
  var metrics = [
    { col: "A", label: "TOTAL RESPONSES", formula: '=COUNTA(B8:B)' },
    { col: "B", label: "TOTAL GUESTS", formula: '=SUM(D8:D)' },
    { col: "C", label: "PELLIKODUKU / PELLIKUTHURU", formula: '=COUNTIFS(E8:E, "Attending", F8:F, "*Pellikoduku*")' },
    { col: "D", label: "HALDI CEREMONY", formula: '=COUNTIFS(E8:E, "Attending", F8:F, "*Haldi*")' },
    { col: "E", label: "MARRIAGE (SUMUHURTHAM)", formula: '=COUNTIFS(E8:E, "Attending", F8:F, "*Marriage*") + COUNTIFS(E8:E, "Attending", F8:F, "*Sumuhurtham*")' },
    { col: "F", label: "DECLINED RSVPs", formula: '=COUNTIF(E8:E, "Declined")' },
    { col: "G", label: "CONFIRMATION RATE", formula: '=IF(COUNTA(B8:B)>0, TEXT((COUNTA(B8:B)-COUNTIF(E8:E,"Declined"))/COUNTA(B8:B),"0.0%"), "0.0%")' }
  ];

  for (var m = 0; m < metrics.length; m++) {
    var kpi = metrics[m];

    // Label
    var lblCell = sheet.getRange(kpi.col + "2");
    lblCell.setValue(kpi.label);
    lblCell.setBackground("#6D1429"); // Regal Maroon
    lblCell.setFontColor("#E3C98A"); // Gold
    lblCell.setFontFamily("Plus Jakarta Sans");
    lblCell.setFontSize(9);
    lblCell.setFontWeight("bold");
    lblCell.setHorizontalAlignment("center");
    lblCell.setVerticalAlignment("middle");

    // Value / Formula
    var valCell = sheet.getRange(kpi.col + "3");
    valCell.setValue(kpi.formula);
    valCell.setBackground("#FFF8E9"); // Warm Parchment
    valCell.setFontColor("#4A0B1A"); // Deep Burgundy
    valCell.setFontFamily("Cinzel");
    valCell.setFontSize(16);
    valCell.setFontWeight("bold");
    valCell.setHorizontalAlignment("center");
    valCell.setVerticalAlignment("middle");
  }

  // 3. TABLE SECTION BANNER (Row 6)
  var sectionRange = sheet.getRange("A6:G6");
  sectionRange.merge();
  sectionRange.setValue("GUEST ATTENDANCE & BLESSINGS LOG (AUTO-SYNCED FROM WEBSITE)");
  sectionRange.setBackground("#3B0713");
  sectionRange.setFontColor("#C9A45C");
  sectionRange.setFontFamily("Plus Jakarta Sans");
  sectionRange.setFontSize(9);
  sectionRange.setFontWeight("bold");
  sectionRange.setHorizontalAlignment("center");
  sectionRange.setVerticalAlignment("middle");

  // 4. COLUMN HEADERS (Row 7)
  var headerRange = sheet.getRange("A7:G7");
  headerRange.setValues([HEADERS]);
  headerRange.setBackground("#8B1E2D");
  headerRange.setFontColor("#FFF8E9");
  headerRange.setFontFamily("Plus Jakarta Sans");
  headerRange.setFontSize(10);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  // 5. SAMPLE GUEST ENTRY (Row 8)
  var sampleTime = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd MMM yyyy, hh:mm a");
  sheet.getRange("A8:G8").setValues([[
    sampleTime,
    "Smt. Sunitha & Sri Venkateswara Rao",
    "+91 98765 43210",
    2,
    "Attending",
    "Marriage (Pradhana Vivaham & Sumuhurtham)",
    "Hearty congratulations and divine blessings to Ajay & Anupama!"
  ]]);
  formatDataRow(sheet, 8, "Attending");

  // Freeze top rows so dashboard stays pinned when scrolling
  sheet.setFrozenRows(7);

  SpreadsheetApp.flush();
  return sheet;
}
