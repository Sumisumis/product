import { useState } from "react";
import { NavLink, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { FiHome, FiMenu, FiSearch, FiUser, FiArrowRight, FiHeart } from "react-icons/fi";
import Detail from "./Detail";
import Sidebar from "./components/Sidebar";
import Home from "./Home";
import Search from "./Search";
import SearchResultPage from "./pages/SearchResultPage";
import "./App.css";

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const searchActive = location.pathname.startsWith("/search");
  return (
    <div className="screen-shell">
      <header className="screen-header">
        <button type="button" className="icon-button header-menu-button" aria-label="メニューを開閉"
          aria-expanded={sidebarOpen} aria-controls="app-sidebar"
          onClick={() => setSidebarOpen((open) => !open)}><FiMenu size={22} /></button>
        <NavLink to="/home" className="header-logo-link" aria-label="ちょこはこ ホーム">
          <img src={`${import.meta.env.BASE_URL}chocohaco_logo2.png`} alt="ちょこはこ choco.haco" className="header-logo" width="680" height="268" />
        </NavLink>
        <NavLink to="/search" className="icon-button header-search" aria-label="スイーツを探す"><FiSearch size={21} /></NavLink>
      </header>
      <Sidebar id="app-sidebar" sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <main className="screen-content" key={location.pathname} id="main-content"><Outlet /></main>
      <nav className="bottom-nav" aria-label="画面切り替え">
        <NavLink to="/home" className={({ isActive }) => `bottom-link ${isActive ? "is-active" : ""}`}>
          <span className="bottom-link-icon"><FiHome size={22} /></span><span className="bottom-link-label">ホーム</span>
        </NavLink>
        <NavLink to="/search" className={`bottom-link ${searchActive ? "is-active" : ""}`}>
          <span className="bottom-link-icon"><FiSearch size={22} /></span><span className="bottom-link-label">さがす</span>
        </NavLink>
        <NavLink to="/mypage" className={({ isActive }) => `bottom-link ${isActive ? "is-active" : ""}`}>
          <span className="bottom-link-icon"><FiUser size={22} /></span><span className="bottom-link-label">マイページ</span>
        </NavLink>
      </nav>
    </div>
  );
}

function MyPage() {
  return <div className="page-stack">
    <div className="page-heading"><p className="eyebrow">MY PAGE</p><h1>マイページ</h1><p>自分だけの、スイーツの楽しみ方を。</p></div>
    <section className="empty-state profile-card"><span className="state-icon"><FiHeart size={30} /></span>
      <h2>お気に入りを、ここに。</h2><p>お気に入りの保存機能は準備中です。<br />まずは気になるスイーツを探してみませんか。</p>
      <NavLink to="/search" className="primary-link">スイーツを探す<FiArrowRight /></NavLink>
    </section>
  </div>;
}

export default function App() {
  return <Routes><Route element={<AppShell />}>
    <Route path="/" element={<Navigate to="/search" replace />} />
    <Route path="/home" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/search-result" element={<SearchResultPage />} />
    <Route path="/stores/:storeId" element={<Detail />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="*" element={<Navigate to="/search" replace />} />
  </Route></Routes>;
}
