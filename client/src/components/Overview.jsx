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
    <div className="px-14">
      <div className="bg-[#16181E] w-full h-[180px] px-4 border border-gray-600 rounded-md">
        <div className="flex py-3 items-center px-4">
          <div className="text-blue-500 text-3xl font-bold flex justify-center items-center px-2">
            <CiWallet />
          </div>
          <div className="text-2xl font-bold text-white flex justify-center items-center">
            Portfolio Overview
          </div>
        </div>
        <div className="flex justify-between text-gray-500 px-10 font-medium">
          <div>
            <div className="flex justify-center items-center">
              <div className="text-[13px] px-1">
                <FaRupeeSign />
              </div>
              <div>Total Investment</div>
            </div>
            <div className="flex justify-start items-center text-white text-[26px] px-3">
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
              <div>Present Value</div>
            </div>
            <div className="flex justify-start items-center text-white text-[26px] px-3">
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
              <div>Total Gain/Loss</div>
            </div>
            <div
              className={` ${
                gainLossReport.isProfit ? "text-green-600" : "text-red-600"
              } text-[26px] px-3`}
            >
              <div>₹{gainLossReport.totalPresentValue.toLocaleString()}</div>
              <div className="text-[12px] flex justify-start px-2 border border-green-500 rounded-[30px] w-fit">
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
  );
};

export default Overview;
