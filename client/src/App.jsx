import Holdings from "./components/Holdings";
import Navbar from "./components/Navbar";
import Overview from "./components/Overview";
import Sector from "./components/Sector";
import { useUserPortfoilo } from "./hooks/useUserPortfolio";

function App() {
  const { isLoading } = useUserPortfoilo();
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
