import { Link } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  sidebarOpen: boolean;
  closeSidebar: () => void;
};

const MENU_SECTIONS = [
  {
    title: "ホーム",
    to: "/home",
    items: [
      { label: "期間・季節限定特集", to: "/home#home-features" },
      { label: "期間限定出店", to: "/home#home-limited-store" },
      { label: "新商品まとめ", to: "/home#home-new-sweets" },
    ],
  },
  {
    title: "検索",
    to: "/search",
    items: [
      { label: "ワード検索", to: "/search" },
      { label: "条件詳細検索", to: "/search#advanced-search" },
    ],
  },
  {
    title: "マイページ",
    to: "/mypage",
    items: [
      { label: "行ってみたいリスト", to: "/mypage#wishlist" },
      { label: "設定", to: "/mypage#settings" },
    ],
  },
] as const;

export default function Sidebar({ sidebarOpen, closeSidebar }: Props) {
  useEffect(() => {
    if (!sidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen, closeSidebar]);

  return (
    <>
      <aside
        className={`nav-drawer ${sidebarOpen ? "is-open" : ""}`}
        aria-hidden={!sidebarOpen}
        aria-label="メインメニュー"
      >
        {/* 閉じるボタン */}
        <button
          type="button"
          className="nav-drawer-close"
          aria-label="メニューを閉じる"
          onClick={closeSidebar}
        >
          ×
        </button>

        <div className="nav-drawer-inner">
          {MENU_SECTIONS.map((section) => (
            <section key={section.title} className="nav-drawer-section">
              <Link
                to={section.to}
                className="nav-drawer-section-title"
                onClick={closeSidebar}
              >
                {section.title}
              </Link>
              <ul className="nav-drawer-sublist">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="nav-drawer-sublink"
                      onClick={closeSidebar}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="nav-drawer-overlay"
          aria-label="メニューを閉じる"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}