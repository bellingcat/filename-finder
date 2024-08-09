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
