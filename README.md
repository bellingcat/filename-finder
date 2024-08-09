# filename-finder

A web extension that displays filenames for images uploaded to Google by users (in maps, reviews, etc).

Its major parts are:

1. The manifest file (manifest.json) - sets the properties of the extension and links to all other files
2. Service worker (background.js) - intercepts responses from `googleusercontent.com` and exposes the `Content-Disposition` header to the content script
3. Content script (image-namer.js) - scans Google pages for images loaded from `googleusercontent.com` using the `background-image` CSS property and fetches the filename from the `Content-Disposition` header.
