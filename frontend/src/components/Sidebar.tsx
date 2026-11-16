
import { useContext, useEffect, useId, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiSearch,
  FiHeart,
  FiSettings,
  FiChevronRight,
  FiHelpCircle,
} from "react-icons/fi";
import { NavigationGuardContext } from "../App";

type Props = {
  id?: string;
  sidebarOpen: boolean;
  closeSidebar: () => void;
};

export default function Sidebar({
  id,
  sidebarOpen,
  closeSidebar,
}: Props) {
  const generatedId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigation = useContext(NavigationGuardContext);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (sidebarOpen && !dialog.open) {
      dialog.showModal();
    } else if (!sidebarOpen && dialog.open) {
      dialog.close();
    }
  }, [sidebarOpen]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    event.preventDefault();

    if (navigation) {
      navigation.requestNavigation(path);
    } else {
      closeSidebar();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={id ?? generatedId}
      className="sidebar-dialog"
      aria-label="メニュー"
      onCancel={(event) => {
        event.preventDefault();
        closeSidebar();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          closeSidebar();
        }
      }}
    >
      <div className="sidebar-top">
        <span className="eyebrow">MENU</span>
        <button
          type="button"
          className="icon-button"
          aria-label="メニューを閉じる"
          onClick={closeSidebar}
        >
          <FiX size={22} />
        </button>
      </div>

      <div className="sidebar-brand">
        <img
          src={`${import.meta.env.BASE_URL}chocohaco_logo2.png`}
          alt="ちょこはこ choco.haco"
          width="220"
          height="87"
        />
        <p>函館で見つける、甘いしあわせ。</p>
      </div>

      <nav className="sidebar-links" aria-label="メインメニュー">
        <NavLink
          to="/home"
          onClick={(event) => handleNavigation(event, "/home")}
        >
          <FiHome />ホーム<FiChevronRight />
        </NavLink>

        <NavLink
          to="/search"
          onClick={(event) => handleNavigation(event, "/search")}
        >
          <FiSearch />カテゴリから探す<FiChevronRight />
        </NavLink>

        <NavLink
          to="/mypage"
          onClick={(event) => handleNavigation(event, "/mypage")}
        >
          <FiHeart />お気に入り<FiChevronRight />
        </NavLink>

        <NavLink
          to="/how-to-use"
          onClick={(event) => handleNavigation(event, "/how-to-use")}
        >
          <FiHelpCircle />使い方<FiChevronRight />
        </NavLink>

        <NavLink
          to="/settings"
          onClick={(event) => handleNavigation(event, "/settings")}
        >
          <FiSettings />設定<FiChevronRight />
        </NavLink>
      </nav>

      <p className="sidebar-note">HAKODATE SWEETS GUIDE</p>
    </dialog>
  );
}