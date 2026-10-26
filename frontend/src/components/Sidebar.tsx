import { useEffect, useId, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FiX, FiHome, FiSearch, FiHeart, FiSettings, FiChevronRight } from "react-icons/fi";

type Props = { id?: string; sidebarOpen: boolean; closeSidebar: () => void };

export default function Sidebar({ id, sidebarOpen, closeSidebar }: Props) {
  const generatedId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sidebarOpen && !dialog.open) dialog.showModal();
    else if (!sidebarOpen && dialog.open) dialog.close();
  }, [sidebarOpen]);

  return <dialog ref={dialogRef} id={id ?? generatedId} className="sidebar-dialog" aria-label="メニュー"
    onCancel={(event) => { event.preventDefault(); closeSidebar(); }}
    onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeSidebar();
    }}>
    <div className="sidebar-top"><span className="eyebrow">MENU</span>
      <button type="button" className="icon-button" aria-label="メニューを閉じる" onClick={closeSidebar}><FiX size={22} /></button>
    </div>
    <div className="sidebar-brand"><img src={`${import.meta.env.BASE_URL}chocohaco_logo2.png`} alt="ちょこはこ choco.haco" width="220" height="87" /><p>函館で見つける、甘いしあわせ。</p></div>
    <nav className="sidebar-links" aria-label="メインメニュー">
      <NavLink to="/home" onClick={closeSidebar}><FiHome />ホーム<FiChevronRight /></NavLink>
      <NavLink to="/search" onClick={closeSidebar}><FiSearch />カテゴリから探す<FiChevronRight /></NavLink>
      <NavLink to="/mypage" onClick={closeSidebar}><FiHeart />お気に入り<FiChevronRight /></NavLink>
      <span className="sidebar-unavailable"><FiSettings />設定<small>準備中</small></span>
    </nav>
    <p className="sidebar-note">HAKODATE SWEETS GUIDE</p>
  </dialog>;
}
