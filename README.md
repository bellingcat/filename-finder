# filename-finder

> [!IMPORTANT]  
> This extension has been deprecated because of an internal API change by Google, which means that the original filenames of images are no longer available.


A web extension that displays filenames for images uploaded to Google by users (in maps, reviews, etc).

Its major parts are:

1. The manifest file (manifest.json) - sets the properties of the extension and links to all other files
2. Service worker (background.js) - intercepts responses from `googleusercontent.com` and exposes the `Content-Disposition` header to the content script
3. Content script (image-namer.js) - scans Google pages for images loaded from `googleusercontent.com` using the `background-image` CSS property and fetches the filename from the `Content-Disposition` header.
