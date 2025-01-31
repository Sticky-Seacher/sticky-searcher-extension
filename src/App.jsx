import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";

const queryClient = new QueryClient();

function App() {
  const [countsPerKeywords, setCountsPerKeywords] = useState([]);

  chrome.runtime.onMessage.addListener((request) => {
    if (request.message === "success") {
      localStorage.setItem("userEmail", request.data);
    }
    return true;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HistorySection countsPerKeywords={countsPerKeywords} />
      <SearchSection
        countsPerKeywords={countsPerKeywords}
        setCountsPerKeywords={setCountsPerKeywords}
      />
      <LatelyHistoryGroup />
    </QueryClientProvider>
  );
}

export default App;
