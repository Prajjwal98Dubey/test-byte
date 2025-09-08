import { use, useState } from "react";
import { CiWallet } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { IoIosTrendingUp } from "react-icons/io";
import { UserContext } from "../contexts/all.context";
import { calculateGainOrLoss } from "../helpers/sector.helpers";

const Overview = () => {
  const { portfolioData } = use(UserContext);
  const [gainLossReport] = useState(calculateGainOrLoss(portfolioData));
  return (
    <div className="mt-2 px-4 lg:px-14">
      <div className="bg-[#16181E] w-full h-[130px] lg:h-[180px] px-2 lg:px-4 border border-gray-600 rounded-md">
        <div className="flex py-3 items-center px-4">
          <div className="text-blue-500 text-3xl font-bold flex justify-center items-center px-2">
            <CiWallet />
          </div>
          <div className="text-lg lg:text-2xl font-bold text-white flex justify-center items-center">
            Portfolio Overview
          </div>
        </div>
        <div className="flex justify-between text-gray-500 px-3 lg:px-10 font-medium">
          <div>
            <div className="flex justify-center items-center">
              <div className="text-[11px] lg:text-[13px] px-1">
                <FaRupeeSign />
              </div>
              <div className="text-[10px] lg:text-[16px]">Total Investment</div>
            </div>
            <div className="flex justify-start items-center text-white text-[17px] lg:text-[26px] px-3">
              ₹
              {portfolioData
                .reduce(
                  (acc, curr) => curr.purchasePrice * curr.quantity + acc,
                  0
                )
                .toLocaleString()}
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <div className="text-[13px] px-1">
                <FiTarget />
              </div>
              <div className="text-[11px] lg:text-[13px]">Present Value</div>
            </div>
            <div className="flex justify-start items-center text-white text-[17px] lg:text-[26px] px-3">
              ₹
              {portfolioData
                .reduce((acc, curr) => curr.cmp * curr.quantity + acc, 0)
                .toLocaleString()}
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <div className="text-[18px] px-1">
                <IoIosTrendingUp />
              </div>
              <div className="text-[11px] lg:text-[13px]">Total Gain/Loss</div>
            </div>
            <div
              className={` ${
                gainLossReport.isProfit ? "text-green-600" : "text-red-600"
              } text-[17px] lg:text-[26px] px-3 flex justify-center`}
            >
              <div>
                <div>₹{gainLossReport.totalPresentValue.toLocaleString()}</div>
                <div className="text-[10px] lg:text-[12px] flex justify-start px-2 border border-green-500 rounded-[30px] w-fit">
                  {gainLossReport.isProfit
                    ? "+" + gainLossReport.percentDiff
                    : gainLossReport.percentDiff}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
