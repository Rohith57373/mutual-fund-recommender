import { Route, Routes } from "react-router-dom";
import { ReadSection } from "../ReadSection";
import Article from "../components/article";
import HomePage from "../pages/HomePage";
import { Analytics } from "./Analytics";
import { NavBar } from "./NavBar";
import Profile from "./Profile";
import MutualFunds from "./mutualfunds";
const Outlet = () => {
  return (
    <div className="flex">
      <NavBar />
      <div className="flex-grow py-8 px-8">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/read" element={<ReadSection />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/funds" element={<MutualFunds />} />
        </Routes>
      </div>
    </div>
  );
};

export default Outlet;
