import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";

const queryClient = new QueryClient();

function App() {
  chrome.storage.local.get(null).then((data) => {
    console.log(data); // 됨
  });

  return (
    <QueryClientProvider client={queryClient}>
      <HistorySection />
      <SearchSection />
      <LatelyHistoryGroup />
    </QueryClientProvider>
  );
}

export default App;
