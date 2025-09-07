import data from "../mocks/portfolio.json" with {type:'json'};
import yahooFinance from "yahoo-finance2";
export const getUserPortfolioData = async (req, res) => {
  let companySymbolList = data.map((company) => `${company.symbol}.NS`);
  try {
    const quotes = await yahooFinance.quote(companySymbolList);
    let symbolToPresentPrice = {};
    quotes.forEach((quote) => {
        symbolToPresentPrice[quote.symbol.split(".")[0]] = quote.regularMarketPrice
    });
    let result= data.map((company)=>({...company,["cmp"]:symbolToPresentPrice[company.symbol]}))
    return res.status(201).json({ message: "data fetched success.",data:result });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(501).json({ error });
  }
};
