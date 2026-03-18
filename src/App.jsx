import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { Hop as Home, CalendarDays, Wallet, MapPin, Menu, X } from "lucide-react";

const PRIMARY_NAV = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/itinerary", icon: CalendarDays, label: "Plan" },
  { path: "/budget", icon: Wallet, label: "Budget" },
  { path: "/places", icon: MapPin, label: "Places" },
];

function BottomNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bottom-nav">
        {PRIMARY_NAV.map(({ path, icon, label }) => {
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
        <button
          className="nav-item menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="More options"
        >
          <span className="nav-icon">
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </span>
          <span>More</span>
        </button>
      </nav>

      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MenuDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/packing", label: "Packing List", icon: "🎒" },
    { path: "/currency", label: "Currency", icon: "💱" },
    { path: "/notes", label: "Travel Journal", icon: "📝" },
    { path: "/photo-tools", label: "Photo Tools", icon: "📸" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="menu-overlay" onClick={onClose} />
      <div className="menu-drawer">
        <div className="menu-header">
          <h3>More Tools</h3>
          <button onClick={onClose} className="menu-close" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="menu-content">
          {menuItems.map(({ path, label, icon }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <button
                key={path}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => handleNavigate(path)}
              >
                <span className="menu-item-icon">{icon}</span>
                <span className="menu-item-label">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
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
