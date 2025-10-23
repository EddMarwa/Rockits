Google Apps Script — Web App to append form POSTs to Google Sheets

Overview

This guide provides a minimal Google Apps Script that accepts JSON POSTs from your website and appends data to a Google Sheet. The client (your Next.js forms) will POST a JSON body like:

{
  "sheet": "Contact_Submissions",
  "data": { "name": "Alice", "email": "a@x.com", "message": "Hello" }
}

The script will ensure a header row exists for the named sheet (creating one from the object keys if missing) and append the row.

Files to create in Apps Script

1) Create a new project at https://script.google.com/ (New project)
2) Replace the default Code.gs with the code from `google-apps-script.gs` (provided below).
3) Replace `SPREADSHEET_ID` with your Google Sheet ID.
4) Save and Deploy as a Web App (see Deployment steps).

Deployment metadata (recorded):

- Deployment ID: AKfycbzc7XlLumvXGCKZshzWR81lXeRHo_QYb1ZcvClVZfDVivWfSlwMTWCnDQWiTE_fORw
- Web App URL: https://script.google.com/macros/s/AKfycbzc7XlLumvXGCKZshzWR81lXeRHo_QYb1ZcvClVZfDVivWfSlwMTWCnDQWiTE_fORw/exec
- Library: https://script.google.com/macros/library/d/1_2d1DhKA9BHrt_rrhpx47QCp5hdKAIA7Mv_5GEA2NJFlBQZ0Spe1gfuC/1
- Spreadsheet Doc ID: 1TsKf_YVyjZMp1BceDwqIEO_9CJXmXfnCXZgjHvzJa9A (CoreBits_Form_Data)


google-apps-script.gs

```javascript
/*
  Hardened Apps Script for CoreBits_Form_Data

  Sheets/tabs expected:
    - ContactForm  (columns: Timestamp, Name, Email, Message)
    - GetNotified  (columns: Timestamp, Email)

  Usage (client POST):
    { sheet: 'ContactForm', data: { name: 'Alice', email: 'a@x.com', message: 'Hello' } }
    { sheet: 'GetNotified', data: { email: 'a@x.com' } }

  Important: Replace SPREADSHEET_ID with the ID of the spreadsheet named CoreBits_Form_Data
*/

const SPREADSHEET_ID = '1TsKf_YVyjZMp1BceDwqIEO_9CJXmXfnCXZgjHvzJa9A'; // e.g. the long id from the sheet URL

function doPost(e) {
  try {
    // Parse incoming JSON (Apps Script provides raw body in e.postData.contents)
    var body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // fallback for form-encoded requests
      body = e.parameter;
    }

    if (!body || !body.sheet || !body.data) {
      return jsonResponse({ ok: false, error: 'Invalid payload; expected { sheet, data }' }, 400);
    }

    var sheetName = body.sheet;
    var data = body.data;

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    if (!ss) return jsonResponse({ ok: false, error: 'Unable to open spreadsheet' }, 500);

    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      // Create the sheet/tab if it doesn't exist
      sheet = ss.insertSheet(sheetName);
    }

    // Read existing headers (first row).
    var lastCol = sheet.getLastColumn();
    var headers = [];
    if (lastCol > 0) {
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    // If the sheet has no headers, set them according to known sheet names
    if (!headers || headers.length === 0 || headers.every(function(h) { return h === ''; })) {
      if (sheetName === 'ContactForm') {
        headers = ['Timestamp', 'Name', 'Email', 'Message'];
      } else if (sheetName === 'GetNotified') {
        headers = ['Timestamp', 'Email'];
      } else {
        headers = Object.keys(data);
      }
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Build a row in header order. Map known header names to data fields.
    var row = headers.map(function(h) {
      if (h === 'Timestamp') return new Date();
      var key = h.toLowerCase();
      // Preferred canonical keys: name, email, message, subscribedAt, submittedAt
      if (key === 'name') return data.name || data.Name || '';
      if (key === 'email') return data.email || data.Email || '';
      if (key === 'message') return data.message || data.Message || '';
      // Fallback: try to return matching key from data
      return data[h] !== undefined ? data[h] : (data[key] !== undefined ? data[key] : '');
    });

    sheet.appendRow(row);
    return jsonResponse({ ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function jsonResponse(obj, statusCode) {
  var payload = JSON.stringify(obj || {});
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}
```

Deployment steps (publish web app)

1. In the Apps Script editor: File → Save.
2. Click Deploy → New deployment.
3. Under "Select type", choose "Web app".
4. For "Execute as", choose "Me" (your account) so the script has access to your sheets.
5. For "Who has access", choose "Anyone" or "Anyone with the link" (or "Anyone, even anonymous" if required). Note: For client-side calls from static sites, "Anyone"/public is typical.
6. Click Deploy and authorize the script when prompted.
7. Copy the Web App URL (it looks like https://script.google.com/macros/s/XXXXX/exec) and paste that into your `.env.local` as NEXT_PUBLIC_GOOGLE_SCRIPT_URL.

Spreadsheet setup

1. Create a new Google Sheet.
2. Copy the spreadsheet ID from the sheet URL (between /d/ and /edit).
3. Replace `SPREADSHEET_ID` in the script with that ID.
4. The script will create sheets (tabs) named after the `sheet` value you send (e.g., "Contact_Submissions"). It will also write headers from the first submission if the sheet is empty.

Security & CORS notes

- If you publish the web app with "Execute as: Me" and "Who has access: Anyone", browser fetch requests from your site should reach the endpoint.
- If you encounter CORS errors, one alternative is to proxy requests through your own server (a tiny serverless function) that calls the Apps Script endpoint.

Testing the endpoint

You can test with curl or Postman. Example curl payload:

```bash
curl -X POST '<WEB_APP_URL>' \
  -H 'Content-Type: application/json' \
  -d '{"sheet":"Contact_Submissions","data":{"name":"Test User","email":"test@example.com","message":"Hello from curl","submittedAt":"2025-10-23T00:00:00Z"}}'
```

If successful, you should see a JSON reply {"status":"success"} and a new row in the specified sheet.

Troubleshooting

- 403 or Authorization errors: ensure you authorized the script and selected the right access level.
- 400 or parsing errors: ensure your client sends valid JSON and the body contains `sheet` and `data` as shown.
- CORS issues: either publish the script appropriately or proxy requests via a server.

If you'd like, I can also generate a serverless proxy example (Netlify Functions / Vercel / Next.js API route) to hide the Apps Script URL and add a small rate-limit or spam protection layer.
