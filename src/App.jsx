import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";
import UserInfoProvider from "./context/UserInfo";

const queryClient = new QueryClient();

function App() {
  const [countsPerKeywords, setCountsPerKeywords] = useState([]);
  const [historyItem, setHistoryItem] = useState([]);

  chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "Get user authentication") {
      localStorage.setItem("userEmail", request.emailData);
      localStorage.setItem("userAccessToken", request.tokenData);
      window.dispatchEvent(new Event("storage"));
    }
    return true;
  });

  return (
    <UserInfoProvider>
      <QueryClientProvider client={queryClient}>
        <HistorySection
          countsPerKeywords={countsPerKeywords}
          setHistoryItem={setHistoryItem}
        />
        <SearchSection
          countsPerKeywords={countsPerKeywords}
          setCountsPerKeywords={setCountsPerKeywords}
        />
        <LatelyHistoryGroup
          historyItem={historyItem}
          setHistoryItem={setHistoryItem}
        />
      </QueryClientProvider>
    </UserInfoProvider>
  );
}

export default App;
