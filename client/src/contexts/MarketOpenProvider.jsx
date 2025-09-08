import { useState } from "react";
import { IsMarketOpenContext } from "./all.context";

const MarketOpenProvider = ({ children }) => {
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  return (
    <IsMarketOpenContext.Provider value={{ isMarketOpen, setIsMarketOpen }}>
      {children}
    </IsMarketOpenContext.Provider>
  );
};

export default MarketOpenProvider;
