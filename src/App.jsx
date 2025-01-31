import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";
import UserInfoProvider from "./context/UserInfo";

const queryClient = new QueryClient();

function App() {
  const [countsPerKeywords, setCountsPerKeywords] = useState([]);

  chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "Get user authentication") {
      localStorage.setItem("userEmail", request.emailData);
      localStorage.setItem("userAccessToken", request.tokenData);
    }
    return true;
  });

  return (
    <UserInfoProvider>
      <QueryClientProvider client={queryClient}>
        <HistorySection countsPerKeywords={countsPerKeywords} />
        <SearchSection
          countsPerKeywords={countsPerKeywords}
          setCountsPerKeywords={setCountsPerKeywords}
        />
        <LatelyHistoryGroup />
      </QueryClientProvider>
    </UserInfoProvider>
  );
}

export default App;
