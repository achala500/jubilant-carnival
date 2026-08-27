// Google Apps Script Parity Backend

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    // Ensure sessions array exists
    const sessions = payload.sessions || [];
    const totalHours = payload.totalHours || 0;
    const manualOverride = payload.manualOverride || false;

    // Here we would typically write to a Google Sheet
    // const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
    // sheet.appendRow([new Date(), JSON.stringify(sessions), totalHours, manualOverride]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Daily log saved",
      sessionsCount: sessions.length
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
