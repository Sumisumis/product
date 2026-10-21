import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import HowToSection from "../components/HowToSection";

export default function HowToUse() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const pages = [
    {
      title: "お店を検索する",
      description: "検索画面から、気になるお店を探します。",
    },
    {
      title: "お店を選ぶ",
      description: "検索結果から、気になるお店を選びます。",
    },
    {
      title: "お店の詳細を見る",
      description: "営業時間や住所など、お店の詳しい情報を確認できます。",
    },
    {
      title: "お気に入りに登録する",
      description: "気になるお店をお気に入りに登録できます。",
    },
  ];

  const moveToPage = (page: number) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * page,
      behavior: "smooth",
    });

    setCurrentPage(page);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const page = Math.round(
      sliderRef.current.scrollLeft / sliderRef.current.clientWidth
    );

    setCurrentPage(page);
  };

  return (
    <div className="howto-page">
      <h1>使い方</h1>

      <div className="howto-container">
        <button
          className="howto-arrow howto-arrow-left"
          onClick={() => moveToPage(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          aria-label="前のページ"
        >
          ‹
        </button>

        <div
          className="howto-slider"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {pages.map((page, index) => (
            <div className="howto-page-slide" key={index}>
              <HowToSection
                number={index + 1}
                title={page.title}
                description={page.description}
              />

              {index === pages.length - 1 && (
                <button
                  className="back-to-mypage"
                  onClick={() => navigate("/mypage")}
                >
                  マイページに戻る
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="howto-arrow howto-arrow-right"
          onClick={() =>
            moveToPage(Math.min(currentPage + 1, pages.length - 1))
          }
          disabled={currentPage === pages.length - 1}
          aria-label="次のページ"
        >
          ›
        </button>
      </div>

      <div className="howto-dots">
        {pages.map((_, index) => (
          <button
            key={index}
            className={`howto-dot ${
              currentPage === index ? "is-active" : ""
            }`}
            onClick={() => moveToPage(index)}
            aria-label={`${index + 1}ページ目`}
          />
        ))}
      </div>
    </div>
  );
}
