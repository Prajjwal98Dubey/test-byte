import { use } from "react";
import { UserContext } from "../contexts/all.context";
import { IoMdTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

const Holdings = () => {
  const { portfolioData } = use(UserContext);
  return (
    <div className="w-full px-8">
      <div className="text-xl lg:text-2xl font-bold text-white px-4 lg:px-8">
        {" "}
        📈 Holding Details
      </div>
      <div className="px-4 lg:px-8 py-2 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse bg-[#16181D] text-white rounded-md">
          <thead>
            <tr className="border-b border-gray-700 bg-[#16181D] text-white text-[12px] lg:text-[14px] rounded-md">
              <th className="px-2 lg:px-4 py-3 text-left font-semibold text-[11px] lg:text-[14px]">
                Stock Name
              </th>
              <th className="px-2 lg:px-4 py-3 text-center text-[11px] lg:text-[14px] font-semibold">
                Purchase Price
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                Quantity
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                Investment
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                Portfolio %
              </th>
              <th className="px-2 lg:px-4 py-3 text-center font-semibold text-[11px] lg:text-[14px]">
                Exchange
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                CMP
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                Present Value
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                Gain/Loss
              </th>
              <th className="px-2 lg:px-4 py-3 text-right font-semibold text-[11px] lg:text-[14px]">
                P/E Ratio
              </th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map((data) => {
              const portfolioPercentage =
                (data.quantity /
                  portfolioData.reduce((acc, curr) => curr.quantity + acc, 0)) *
                100;
              const gainOrLossValue =
                data.cmp * data.quantity - data.purchasePrice * data.quantity;
              const gainOrLossValuePercent = (
                gainOrLossValue /
                (data.purchasePrice * data.quantity)
              ).toFixed(2);
              return (
                <tr
                  key={data.symbol}
                  className="border-b border-gray-700 transition-colors text-white"
                >
                  <td className="px-2 lg:px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white text-[11px] lg:text-[14px]">
                        {data.name}
                      </span>
                      <span className=" text-gray-500 mt-0.5 text-[10px] lg:text-[12px]">
                        {data.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right text-[11px] lg:text-[14px]">
                    ₹{data.purchasePrice.toLocaleString()}
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right text-[11px] lg:text-[14px]">
                    {data.quantity}
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right font-semibold text-[12px] lg:text-[15px]">
                    ₹{(data.purchasePrice * data.quantity).toLocaleString()}
                  </td>
                  <td className="px-2 lg;px-4 py-3 text-right text-[11px] lg:text-[13px]">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-[30px] border border-gray-600">
                      {portfolioPercentage.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-center">
                    <span className="inline-block px-4 py-1 text-xs font-mono font-medium border border-blue-500 text-blue-500  rounded-[35px]">
                      NSE
                    </span>
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right font-medium text-[11px] lg:text-[14px]">
                    ₹{data.cmp.toLocaleString()}
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right font-semibold text-[12px] lg:text-[15px]">
                    ₹{(data.cmp * data.quantity).toLocaleString()}
                  </td>
                  <td
                    className={`px-2 lg:px-4 py-3 text-right font-mono font-bold ${
                      gainOrLossValue >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <span className="w-4 h-4 inline-block">
                        {gainOrLossValue >= 0 ? (
                          <IoMdTrendingUp />
                        ) : (
                          <IoIosTrendingDown />
                        )}
                      </span>
                      <div className="flex flex-col items-end">
                        <span>
                          ₹{Math.abs(gainOrLossValue).toLocaleString()}
                        </span>
                        <span className="text-xs mt-0.5">
                          ({gainOrLossValuePercent}%)
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 lg:px-4 py-3 text-right text-xs font-bold">
                    {(data.cmp / data.earningPerShare).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holdings;
