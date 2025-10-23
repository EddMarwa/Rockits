Place your official PDF documents in this directory so they are publicly available at /docs/<filename>.pdf

Expected files (examples used by the Legal page):
- sample-1.pdf  -> Q4 Mining Performance
- sample-2.pdf  -> Infrastructure Audit
- sample-3.pdf  -> Security Assessment

How to add files (PowerShell):
1. Copy your PDFs into this folder. Example:
   cp C:\Users\you\Downloads\Q4-report.pdf .\sample-1.pdf

2. Commit to git:
   git add public/docs/sample-1.pdf; git commit -m "Add legal PDFs"; git push

Notes:
- Use lowercase filenames without spaces; the site links to /docs/sample-1.pdf, etc.
- If you're working on a case-sensitive host (Linux), normalizing filenames is important.

If you'd like, I can also create small placeholder PDF files locally, but many CI/build systems prefer you supply the real documents for security and accuracy.