/* eslint-disable no-undef */

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "userStatus") {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      sendResponse({ message: token });
    });
  }
  return true;
});
