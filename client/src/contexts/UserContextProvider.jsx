import { useState } from "react";
import { UserContext } from "./all.context";

function UserContextProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState([]);
  return (
    <UserContext.Provider value={{ portfolioData, setPortfolioData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
