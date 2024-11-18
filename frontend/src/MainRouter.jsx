import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import App from "./App";
import DrinkDetail from "./components/DrinkDetail/DrinkDetail";

function MainRouter() {
  return (
    <Router>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/detail" element={<DrinkDetail />} />
        </Routes>
      </SearchProvider>
    </Router>
  );
}

export default MainRouter;
