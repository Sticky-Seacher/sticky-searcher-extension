import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HistorySection />
      <SearchSection />
      <LatelyHistoryGroup />
    </QueryClientProvider>
  );
}

export default App;
