import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Home from "./Home";
import Search from "./Search";
import SearchResultPage from "./pages/SearchResultPage";
import "./App.css";

function AppShell() {
  return (
    <main className="screen-shell">
      <header className="screen-header">
        <span className="header-title">ヘッダー</span>
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
          element={<Navigate to="/search" replace />}
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
          path="/mypage"
          element={
            <section className="placeholder-page">
              マイページ
            </section>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/search" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;