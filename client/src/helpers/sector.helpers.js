export const mapSectorToEmoji = {
  technology: "💻",
  healthcare: "🏥",
  energy: "⚡",
  financials: "🏦",
  "consumer goods": "🛍️",
};

export const formatSectorName = (title) => {
  return title
    .split(" ")
    .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
    .join(" ");
};

export const calculateGainOrLoss = (data) => {
  let totalInvestment = data.reduce(
    (acc, current) => current.purchasePrice * current.quantity + acc,
    0
  );
  let returnedPrice = data.reduce(
    (acc, current) => current.cmp * current.quantity + acc,
    0
  );
  let difference = returnedPrice - totalInvestment;
  let percentage = (difference / totalInvestment) * 100;
  return {
    isProfit: difference >= 0 ? true : false,
    percentDiff: percentage.toFixed(2),
    totalPresentValue: Math.abs(difference),
  };
};
