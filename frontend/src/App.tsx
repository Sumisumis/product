
import { createContext, useCallback, useRef, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FiHome, FiMenu, FiSearch, FiUser } from "react-icons/fi";
import Detail from "./Detail";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import Mypage from "./Mypage";
import Search from "./Search";
import SearchResultPage from "./pages/SearchResultPage";
import HowToUse from "./pages/HowToUse";
import Settings from "./pages/Settings";
import "./App.css";

type NavigationHandler = (path: string) => void;

type NavigationContextType = {
  requestNavigation: (path: string) => void;
  registerNavigationHandler: (handler: NavigationHandler | null) => void;
};

export const NavigationGuardContext =
  createContext<NavigationContextType | null>(null);

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navigationHandler = useRef<NavigationHandler | null>(null);

  const searchActive = location.pathname.startsWith("/search");

  const registerNavigationHandler = useCallback(
    (handler: NavigationHandler | null) => {
      navigationHandler.current = handler;
    },
    []
  );

  const requestNavigation = useCallback(
    (path: string) => {
      if (navigationHandler.current) {
        navigationHandler.current(path);
      } else {
        navigate(path);
      }
      setSidebarOpen(false);
    },
    [navigate]
  );

  return (
    <NavigationGuardContext.Provider
      value={{ requestNavigation, registerNavigationHandler }}
    >
      <div className="screen-shell">
        <header className="screen-header">
          <button
            type="button"
            className="icon-button header-menu-button"
            aria-label="メニューを開閉"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <FiMenu size={22} />
          </button>

          <NavLink
            to="/home"
            className="header-logo-link"
            aria-label="ちょこはこ ホーム"
            onClick={(event) => {
              event.preventDefault();
              requestNavigation("/home");
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}chocohaco_logo2.png`}
              alt="ちょこはこ choco.haco"
              className="header-logo"
              width="680"
              height="268"
            />
          </NavLink>

          <NavLink
            to="/search"
            className="icon-button header-search"
            aria-label="スイーツを探す"
            onClick={(event) => {
              event.preventDefault();
              requestNavigation("/search");
            }}
          >
            <FiSearch size={21} />
          </NavLink>
        </header>

        <Sidebar
          id="app-sidebar"
          sidebarOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main
          className="screen-content"
          key={location.pathname}
          id="main-content"
        >
          <Outlet />
        </main>

        <nav className="bottom-nav" aria-label="画面切り替え">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `bottom-link ${isActive ? "is-active" : ""}`
            }
            onClick={(event) => {
              event.preventDefault();
              requestNavigation("/home");
            }}
          >
            <span className="bottom-link-icon">
              <FiHome size={22} />
            </span>
            <span className="bottom-link-label">ホーム</span>
          </NavLink>

          <NavLink
            to="/search"
            className={`bottom-link ${searchActive ? "is-active" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              requestNavigation("/search");
            }}
          >
            <span className="bottom-link-icon">
              <FiSearch size={22} />
            </span>
            <span className="bottom-link-label">さがす</span>
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              `bottom-link ${isActive ? "is-active" : ""}`
            }
            onClick={(event) => {
              event.preventDefault();
              requestNavigation("/mypage");
            }}
          >
            <span className="bottom-link-icon">
              <FiUser size={22} />
            </span>
            <span className="bottom-link-label">マイページ</span>
          </NavLink>
        </nav>
      </div>
    </NavigationGuardContext.Provider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/stores/:storeId" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Route>
    </Routes>
  );
}