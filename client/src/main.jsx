import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import MarketOpenProvider from "./contexts/MarketOpenProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <MarketOpenProvider>
      <App />
    </MarketOpenProvider>
  </UserContextProvider>
);
