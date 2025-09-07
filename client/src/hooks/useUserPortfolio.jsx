import { use, useEffect, useState } from "react";
import { GET_USER_PORTFOLIO } from "../apis/api.backend";
import { UserContext } from "../contexts/all.context";

export function useUserPortfoilo() {
  const [isLoading, setIsLoading] = useState(true);
  const { setPortfolioData } = use(UserContext);
  useEffect(() => {
    const getUserPortfolioData = async () => {
      setIsLoading(true);
      let res = await fetch(GET_USER_PORTFOLIO);
      res = await res.json();
      setPortfolioData(res.data);
      setIsLoading(false);
    };
    getUserPortfolioData();
  }, []);

  return { isLoading };
}
