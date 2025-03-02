import { convertToLinkMap } from "./convertToLinkMap";
import { createRules } from "./createRules";

chrome.runtime.onInstalled.addListener(async function () {
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingRules.map((rule) => rule.id),
  });
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = new URL(details.url);
  const isGoogleSearch =
    url.origin + url.pathname === "https://www.google.com/search"
      ? true
      : false;

  if (isGoogleSearch) {
    const tabId = details.tabId;

    async function sendMessageToActiveTab(message, callbback = () => {}) {
      const response = await chrome.tabs.sendMessage(tabId, message);

      callbback(response);
    }

    sendMessageToActiveTab("give-me-linkMap", (response) => {
      chrome.storage.local.set({ [`${tabId}`]: response });
    });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local") {
    chrome.declarativeNetRequest.getDynamicRules().then((existingRules) => {
      const newRules = [];

      for (let { newValue } of Object.values(changes)) {
        if (newValue) {
          const newLinkMaps = convertToLinkMap(newValue);
          newRules.push(...createRules(newLinkMaps, 1));
        }
      }

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRules.map((rule) => rule.id),
        addRules: newRules,
      });
    });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.remove(`${tabId}`);
});
