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

google-apps-script.gs

```javascript
// Replace with the ID of your Google Spreadsheet (the long ID in the sheet URL)
const SPREADSHEET_ID = 'REPLACE_WITH_SPREADSHEET_ID';

function doPost(e) {
  try {
    // Parse incoming JSON body
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    }

    var sheetName = params.sheet || 'Sheet1';
    var data = params.data || {};

    // Open spreadsheet and ensure sheet exists
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Determine headers: if sheet has headers (first row non-empty), use them.
    var lastCol = sheet.getLastColumn();
    var headers = [];
    if (lastCol > 0) {
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    // If no headers, derive them from data keys and write them
    var dataKeys = Object.keys(data);
    if (!headers || headers.length === 0 || headers.every(h => h === '')) {
      headers = dataKeys;
      if (headers.length === 0) {
        // Nothing to append
        return jsonResponse({ status: 'error', message: 'No data keys provided' }, 400);
      }
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Build row in header order
    var row = headers.map(function(h) { return data[h] !== undefined ? data[h] : '' });

    // Append the row
    sheet.appendRow(row);

    return jsonResponse({ status: 'success' }, 200);
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message }, 500);
  }
}

function jsonResponse(obj, statusCode) {
  // Simple JSON response
  var payload = JSON.stringify(obj || {});
  var output = ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
  return output;
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
