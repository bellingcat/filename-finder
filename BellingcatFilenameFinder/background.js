chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1], // Remove existing rules with this ID
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "modifyHeaders",
          responseHeaders: [
            {
              header: "Access-Control-Expose-Headers",
              operation: "append",
              value: "Content-Disposition",
            },
          ],
        },
        condition: {
          urlFilter: "*://*.googleusercontent.com/*",
          resourceTypes: ["xmlhttprequest"],
        },
      },
    ],
  });
});

chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Send message to the content script containing the URL
    chrome.tabs.sendMessage(details.tabId, {
      action: "loadPostData",
      url: details.url,
      details: details
    });
  },
  { urls: ["*://www.google.com/maps/rpc/listugcposts*"] },
  []
);