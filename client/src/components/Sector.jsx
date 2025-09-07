import { use, useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { UserContext } from "../contexts/all.context";
import SectorComp from "./SectorComp";
import { calculateGainOrLoss } from "../helpers/sector.helpers";

const Sector = () => {
  const [sectorData, setSectorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { portfolioData } = use(UserContext);
  useEffect(() => {
    const divideInSectors = () => {
      setIsLoading(true);
      const tmp = {};
      portfolioData.forEach((data) => {
        if (!tmp[data.sector.toLowerCase()])
          tmp[data.sector.toLowerCase()] = [];
        tmp[data.sector.toLowerCase()].push(data);
      });
      setSectorData(tmp);
      setIsLoading(false);
    };
    divideInSectors();
  }, [portfolioData]);
  return (
    <div className="px-8 mt-4 text-white">
      <div className="text-2xl font-bold flex px-4 ">
        <div className="flex justify-center items-center px-2">📊</div>
        <div className="flex justify-center items-center">
          Sector Performance
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center text-3xl font-bold text-white">
          Loading...
        </div>
      ) : (
        <div className="w-full flex flex-wrap px-6 my-2">
          {Object.keys(sectorData).map((data) => (
            <div
              key={data}
              className="w-[450px] h-[390px] rounded-md bg-[#16181E] border border-gray-600 mx-2 my-2"
            >
              <SectorComp
                title={data}
                data={sectorData[data]}
                gainLossReport={calculateGainOrLoss(sectorData[data])}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sector;
