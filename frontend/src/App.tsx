import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Home from "./Home";
import Mypage from "./Mypage";
import Search from "./Search";
import SearchResultPage from "./pages/SearchResultPage";
import HowToUse from "./pages/HowToUse";
import "./App.css";

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="screen-shell">
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <header className="screen-header">
        <button
          type="button"
          className="header-menu-button"
          aria-label="メニューを開く"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <span className="header-title">ちょこはこ</span>
        <span className="header-spacer" aria-hidden="true" />
      </header>

      <section className="screen-content">
        <Outlet />
      </section>

      <nav className="bottom-nav" aria-label="画面切り替え">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          ホーム
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          検索
        </NavLink>

        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            `bottom-link ${isActive ? "is-active" : ""}`
          }
        >
          マイページ
        </NavLink>
      </nav>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/stores/:storeId" element={<Detail />} />

      <Route element={<AppShell />}>
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/search-result"
          element={<SearchResultPage />}
        />

<Route
          path="/how-to-use"
          element={<HowToUse />}
        />

        <Route path="/mypage" element={<Mypage />} />

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;