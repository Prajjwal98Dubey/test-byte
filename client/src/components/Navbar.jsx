import { use, useEffect, useRef, useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { IsMarketOpenContext } from "../contexts/all.context";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isMarketOpen, setIsMarketOpen } = use(IsMarketOpenContext);
  const timerRef = useRef(null);
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setIsMarketOpen(checkIfMarketOpen());
      }, 1000 * 15);
      setIsLoading(false);
    }
    setIsMarketOpen(checkIfMarketOpen());
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  const checkIfMarketOpen = (date = new Date()) => {
    const istOffset = 5.5 * 60;
    const localOffset = date.getTimezoneOffset();
    const istTime = new Date(
      date.getTime() + (istOffset + localOffset) * 60000
    );

    const day = istTime.getDay();
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    if (day === 0 || day === 6) return false;
    const openTime = 9 * 60 + 15;
    const closeTime = 15 * 60 + 30;
    const currentTime = hours * 60 + minutes;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="w-full h-[90px] lg:h-[120px] mb:2 lg:mb-5 bg-[#121419] border border-transparent border-b-gray-600 flex justify-between items-center px-2 lg:px-8">
      <div className="flex ">
        <div className="text-blue-500 text-xl lg:text-4xl flex justify-center items-center">
          <AiOutlineStock />
        </div>
        <div className="text-white font-bold px-2">
          <p className="text-end text-lg lg:text-3xl">Portfolio Dashboard</p>
          <p className="text-[10px] lg:text-[12px] text-gray-500 text-start">
            Real-time stock portfolio tracking
          </p>
        </div>
      </div>
      <div className="text-gray-400">
        <div className="flex">
          <div className="flex justify-center items-center px-2">
            <FiRefreshCcw />
          </div>
          <div className="text-[12px] lg:text-[16px]">Auto-refresh: 15s</div>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center">
            <div className="animate-spin w-fit h-fit text-gray-500 text-sm">
              <FiRefreshCcw />
            </div>
          </div>
        ) : (
          <div className="flex justify-center w-full mt-1 mx-2">
            <div
              className={`w-fit h-fit px-3 py-1 rounded-[30px] bg-gradient-to-r text-white ${
                isMarketOpen
                  ? "from-green-500 to-green-600"
                  : "from-red-500 to-red-600"
              }`}
            >
              <div className="text-[9px] lg:text-[10px] font-semibold ">
                {isMarketOpen ? "Market Open" : "Market Closed"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
