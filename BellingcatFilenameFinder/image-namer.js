// image-namer.js

// Fetch and extract the title from the image headers
async function fetchImageTitle(url) {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "cors" }); // Perform a HEAD request
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Return part of the 'Content-Disposition' header
    const contentDisposition = response.headers.get("Content-Disposition");
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
      if (filenameMatch && filenameMatch[1]) {
        return filenameMatch[1]; // Return the filename
      }
    }
  } catch (error) {
    console.error("Failed to fetch image filename:", error);
  }
  return "error";
}

// Function to process elements with the matching background-image pattern
function processElements() {
  const backgroundImageElements = document.querySelectorAll(
    `[style*="background-image"]`
  ); // Select elements with the matching style
  const googleusercontentPattern =
    /background-image:\s*url\("https:\/\/.*\.googleusercontent\.com\/p\/.*"\);/;
  const googleusercontentURLPattern =
    /url\("(https:\/\/.*\.googleusercontent\.com\/p\/.*)"\)/;
  const newDivClass = "custom-filename-div";

  backgroundImageElements.forEach(async (imageElement) => {
    const style = imageElement.getAttribute("style");
    // Only continue if the element doesn't already have a title div and the style matches the pattern
    if (
      !imageElement.querySelector("." + newDivClass) &&
      style &&
      googleusercontentPattern.test(style)
    ) {
      const urlMatch = style.match(googleusercontentURLPattern);
      if (urlMatch && urlMatch[1]) {
        const imageUrl = urlMatch[1];
        const imageTitle = await fetchImageTitle(imageUrl);
        const titleDiv = document.createElement("div");
        titleDiv.textContent = imageTitle;
        titleDiv.classList.add(newDivClass);
        imageElement.append(titleDiv);
      }
    }
  });
}

// Debounce function to limit the rate of execution
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Run the extension when the DOM changes with a 1s debounce
const observer = new MutationObserver(debounce(processElements, 1000));
observer.observe(document.body, { childList: true, subtree: true });
