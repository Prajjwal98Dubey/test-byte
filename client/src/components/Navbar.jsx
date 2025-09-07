import { AiOutlineStock } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="w-full h-[120px] mb-5 bg-[#121419] border border-transparent border-b-gray-600 flex justify-between items-center px-8">
      <div className="flex ">
        <div className="text-blue-500 text-4xl flex justify-center items-center">
          <AiOutlineStock />
        </div>
        <div className="text-white font-bold px-2">
          <p className="text-end text-3xl">Portfolio Dashboard</p>
          <p className="text-[12px] text-gray-500 text-start">
            Real-time stock portfolio tracking
          </p>
        </div>
      </div>
      <div className="text-gray-400 flex">
        <div className="flex justify-center items-center px-2">
          <FiRefreshCcw />
        </div>
        <div>Auto-refresh: 15s</div>
      </div>
    </div>
  );
};

export default Navbar;
