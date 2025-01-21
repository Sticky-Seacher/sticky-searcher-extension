import iconUrl from "../public/sticky-seacher-logo.png";

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

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  const isGoogleSearch =
    url.origin + url.pathname === "https://www.google.com/search"
      ? true
      : false;

  if (isGoogleSearch) {
    const tabId = details.tabId;

    async function sendMessageToActiveTab(message) {
      const response = await chrome.tabs.sendMessage(tabId, message);

      chrome.storage.local.set({ [`${tabId}`]: response }).then(() => {
        chrome.notifications.create({
          type: "basic",
          iconUrl: `${iconUrl}`,
          title: "description들이 준비되었습니다.",
          message:
            "Completed loading: " + details.url + "tabId" + details.tabId,
        });
      });
      chrome.storage.local.get(`${tabId}`).then((data) => {
        chrome.notifications.create({
          type: "basic",
          iconUrl: `${iconUrl}`,
          title: "다음과 같이 확인이 가능합니다.",
          message: data[tabId],
        });
      });
    }

    sendMessageToActiveTab("give-me-linkMap");
  }
});
