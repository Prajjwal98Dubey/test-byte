import { use, useEffect, useRef } from "react";
import Holdings from "./components/Holdings";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import Sector from "./components/Sector";
import { useUserPortfoilo } from "./hooks/useUserPortfolio";
import { IsMarketOpenContext, UserContext } from "./contexts/all.context";
import { GET_MARKET_UPDATES } from "./apis/api.backend";
import { getUpdatedStockValue } from "./helpers/stocke.helper";

function App() {
  const { isLoading } = useUserPortfoilo();
  const { isMarketOpen } = use(IsMarketOpenContext);
  const { portfolioData, setPortfolioData } = use(UserContext);
  const intervalRef = useRef(null);
  useEffect(() => {
    const getMarketUpdates = async () => {
      let res = await fetch(GET_MARKET_UPDATES);
      res = await res.json();
      let newData = portfolioData.map((data) => ({
        ...data,
        ["cmp"]: getUpdatedStockValue(res.data, data.symbol),
      }));
      setPortfolioData([...newData]);
    };
    if (isMarketOpen) {
      intervalRef.current = setInterval(() => {
        getMarketUpdates();
      }, 1000 * 15);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isMarketOpen]);
  return (
    <div className="bg-[#0E1015] w-full min-h-screen">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center lg:text-3xl text-xl font-bold text-white">
          Loading....
        </div>
      ) : (
        <>
          <Overview />
          <Sector />
          <Holdings />
        </>
      )}
    </div>
  );
}

export default App;
