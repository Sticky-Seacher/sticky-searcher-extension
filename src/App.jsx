import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HistoryButton } from "./sidePanel-history-button.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryButton />
    </QueryClientProvider>
  );
}

export default App;
