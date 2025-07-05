import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy, useEffect, useState } from "react";

import HistorySection from "./components/history-section";
import LatelyHistoryGroup from "./components/lately-history-croup/LatelyHistoryGroup";
import SearchSection from "./components/search-section";
import UserInfoProvider from "./context/UserInfo";

const queryClient = new QueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

function App() {
  const [countsPerKeywords, setCountsPerKeywords] = useState([]);

  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

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
        <HistorySection countsPerKeywords={countsPerKeywords} />
        <SearchSection
          countsPerKeywords={countsPerKeywords}
          setCountsPerKeywords={setCountsPerKeywords}
        />
        <LatelyHistoryGroup />
        {/* [빌드된 파일에서 ReactQueryDevtools 사용] 사이트 패널의 콘솔에서 window.toggleDevtools() 입력시 사용 가능 */}
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </QueryClientProvider>
    </UserInfoProvider>
  );
}

export default App;
