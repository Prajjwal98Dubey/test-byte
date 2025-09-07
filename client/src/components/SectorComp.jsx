import { formatSectorName, mapSectorToEmoji } from "../helpers/sector.helpers";
import { RiPieChartLine } from "react-icons/ri";
import { IoMdTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

const SectorComp = ({ title, data, gainLossReport }) => {
  return (
    <div className="w-full h-full text-white">
      <div className="py-4 w-full flex justify-between px-4 my-1">
        <div className="flex justify-center items-center">
          <div className="text-xl px-1">{mapSectorToEmoji[title]}</div>
          <div className="text-xl font-medium">{formatSectorName(title)}</div>
        </div>
        <div className="px-4 py-2 border border-gray-600 rounded-[10px] flex justify-center items-center text-[12px] font-bold">
          {data.length} stocks
        </div>
      </div>
      <div className="my-1 flex justify-between items-center py-4 px-4">
        <div>
          <div className="flex text-gray-500 text-[15px] font-medium">
            <div className="px-1 flex justify-center items-center">₹</div>
            <div className="flex justify-center items-center">
              Total Investment
            </div>
          </div>
          <div className="px-1 font-bold text-2xl flex justify-center items-center">
            ₹
            {data
              .reduce(
                (acc, current) =>
                  current.purchasePrice * current.quantity + acc,
                0
              )
              .toLocaleString()}
          </div>
        </div>
        <div>
          <div className="flex text-gray-500 text-[15px] font-medium">
            <div className="px-1 flex justify-center items-center">
              <RiPieChartLine />
            </div>
            <div className="flex justify-center items-center">
              Present Value
            </div>
          </div>
          <div className="px-1 font-bold text-2xl flex justify-center items-center">
            ₹
            {data
              .reduce((acc, current) => current.cmp * current.quantity + acc, 0)
              .toLocaleString()}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-[1px] px-4 my-2">
        <div className="bg-gray-700 w-[97%] h-full"></div>
      </div>
      <div className="w-full h-[90px] px-4 my-2">
        <div
          className={`w-full h-full rounded-md ${
            gainLossReport["isProfit"] ? "bg-[#192A1F]" : "bg-[#2A1C20]"
          } flex justify-between items-center py-4 `}
        >
          <div className="flex px-4">
            <div
              className={`text-xl font-bold flex justify-center items-center px-1 ${
                gainLossReport["isProfit"] ? "text-[#33BA27]" : "text-[#D22B24]"
              } `}
            >
              {gainLossReport["isProfit"] ? (
                <IoMdTrendingUp />
              ) : (
                <IoIosTrendingDown />
              )}
            </div>
            <div className="flex justify-center items-center text-[14px] text-gray-400 font-medium">
              Total Gain/Loss
            </div>
          </div>
          <div
            className={`${
              gainLossReport["isProfit"] ? "text-[#33BA27]" : "text-[#D22B24]"
            } px-4`}
          >
            <div className="flex justify-center items-center font-medium">
              ₹{gainLossReport["totalPresentValue"].toLocaleString()}
            </div>
            <div className="flex justify-end items-center text-[13px]">
              ({gainLossReport["percentDiff"]}%)
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <div className="font-light text-gray-500">Holdings:</div>
        <div className="w-full text-gray-500 font-medium">
          {data.slice(0, 3).map((d) => (
            <div
              key={d.symbol}
              className="w-full flex justify-between my-1 text-[13px]"
            >
              <div className="flex justify-center items-center">
                {d.symbol.toUpperCase()}
              </div>
              <div className="text-white flex justify-center items-center">
                {d.quantity} stocks
              </div>
            </div>
          ))}
        </div>
        {data.length > 3 && (
          <div className="w-full h-full flex justify-center items-center">
            <button className="text-white font-medium flex justify-center items-center bg-blue-500 hover:bg-blue-600 cursor-pointer px-8 py-2 rounded-md">
              View more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorComp;
