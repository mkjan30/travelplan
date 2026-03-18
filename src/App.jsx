import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import Itinerary from "./pages/Itinerary";
import Budget from "./pages/Budget";
import Places from "./pages/Places";
import Packing from "./pages/Packing";
import Currency from "./pages/Currency";
import Notes from "./pages/Notes";
import PhotoTools from "./pages/PhotoTools";
import "./index.css";
import { Home, CalendarDays, Wallet, MapPin, Briefcase, DollarSign, NotebookPen, Camera } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/itinerary", icon: CalendarDays, label: "Plan" },
  { path: "/budget", icon: Wallet, label: "Budget" },
  { path: "/places", icon: MapPin, label: "Places" },
  { path: "/packing", icon: Briefcase, label: "Pack" },
  { path: "/currency", icon: DollarSign, label: "FX" },
  { path: "/notes", icon: NotebookPen, label: "Journal" },
  { path: "/photo-tools", icon: Camera, label: "Photo" },
];

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ path, icon, label }) => {
        const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
        const NavIcon = icon;
        return (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={`nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon"><NavIcon size={22} strokeWidth={isActive ? 2.5 : 2} /></span>
            <span>{label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default function App() {
  const [budgetData, setBudgetData] = useLocalStorage("budget_data", {});

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Dashboard budgetData={budgetData} />} />
          <Route path="/itinerary" element={<Itinerary budgetData={budgetData} />} />
          <Route path="/budget" element={<Budget budgetData={budgetData} setBudgetData={setBudgetData} />} />
          <Route path="/places" element={<Places />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/photo-tools" element={<PhotoTools />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
