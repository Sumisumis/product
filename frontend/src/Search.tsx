import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles/styles";
import { useMemo, useState } from "react";

type ViewMode = "sweets" | "shops";

type ShopItem = {
  storeId: string;
  name: string;
  info: string;
  image: string;
};

const sweetImages = [
  "http://localhost:3000/images/sweets/いちご大福.jpg",
  "http://localhost:3000/images/sweets/どら焼き.jpg",
  "http://localhost:3000/images/sweets/どら焼きカスタード.jpg",
  "http://localhost:3000/images/sweets/アップルパイ.jpg",
  "http://localhost:3000/images/sweets/クッキー.jpg",
  "http://localhost:3000/images/sweets/シュークリーム.jpg",
  "http://localhost:3000/images/sweets/ショートケーキ.jpg",
  "http://localhost:3000/images/sweets/チョコクッキーシュー.jpg",
  "http://localhost:3000/images/sweets/チョコレートケーキ.jpg",
  "http://localhost:3000/images/sweets/チーズケーキ.jpg",
  "http://localhost:3000/images/sweets/ティラミス.jpg",
  "http://localhost:3000/images/sweets/バニラアイス.jpg",
  "http://localhost:3000/images/sweets/パンケーキ.jpg",
  "http://localhost:3000/images/sweets/プリン.jpg",
  "http://localhost:3000/images/sweets/モンブラン.jpg",
  "http://localhost:3000/images/sweets/ロールケーキ.jpg",
  "http://localhost:3000/images/sweets/大福.jpg",
  "http://localhost:3000/images/sweets/抹茶アイス.jpg",
];

const SHOP_ITEMS: ShopItem[] = [
  {
    storeId: "1",
    name: "カフェ ミルク",
    info: "洋菓子・カフェ",
    image: "/images/shops/shop1.jpg",
  },
  {
    storeId: "2",
    name: "スイーツ工房 ひなた",
    info: "和菓子・洋菓子",
    image: "/images/shops/shop2.jpg",
  },
  {
    storeId: "3",
    name: "洋菓子店 ルナ",
    info: "洋菓子",
    image: "/images/shops/shop3.jpg",
  },
];

const getRandomImages = (
  images: string[],
  count: number
) => {
  return [...images]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

function StaticPhoto({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="photo-slot photo-slot--fallback"
        role="presentation"
      />
    );
  }

  return (
    <div className="photo-slot">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="photo-slot-image"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("sweets");
  const navigate = useNavigate();

  const keyword = query.trim().toLowerCase();

  const filteredSweets = useMemo(() => {
    if (!keyword) return sweetImages;

    return sweetImages.filter((image) =>
      decodeURIComponent(image).toLowerCase().includes(keyword)
    );
  }, [keyword]);

  const displaySweetImages = useMemo(() => {
    return getRandomImages(filteredSweets, 9);
  }, [filteredSweets]);

  const filteredShops = useMemo(() => {
    if (!keyword) return SHOP_ITEMS;

    return SHOP_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.info.toLowerCase().includes(keyword)
    );
  }, [keyword]);

  const resultCount =
    viewMode === "sweets"
      ? displaySweetImages.length
      : filteredShops.length;

  const handleSearch = () => {
     navigate(
    `/search-result?keyword=${encodeURIComponent(query)}`,
    { replace: true }
    );
  };

  return (
    <section className="search-layout">
      <div style={styles.searchBox}>
        <input
           type="text"
           placeholder={
            viewMode === "sweets"
              ? "スイーツ名で検索"
              : "お店名で検索"
          }
           value={query}
           onChange={(event) =>
               setQuery(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
          }
          }}
          style={styles.searchInput}
  />

          <button
           type="button"
           onClick={handleSearch}
           style={{
                marginLeft: "10px",
                padding: "10px 14px",
               cursor: "pointer",
           }}
            >
              <span style={{ fontSize: "24px" }}>
             🔍
             </span>
          </button>
     </div>

      <div className="search-view-toggle" role="tablist" aria-label="検索表示切替">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === "sweets"}
          className={`search-view-toggle-btn ${
            viewMode === "sweets" ? "is-active" : ""
          }`}
          onClick={() => setViewMode("sweets")}
        >
          スイーツ
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === "shops"}
          className={`search-view-toggle-btn ${
            viewMode === "shops" ? "is-active" : ""
          }`}
          onClick={() => setViewMode("shops")}
        >
          店舗
        </button>
      </div>

      <p className="search-summary">
        全{resultCount}件
        {keyword ? (
          <>
            {" "}
            &quot;{query.trim()}&quot;
          </>
        ) : (
          <>
            {" "}
            &quot;洋菓子&quot;&quot;1000円以下&quot;
          </>
        )}
      </p>

      {viewMode === "sweets" ? (
        <div className="photo-strip photo-strip--grid">
          {displaySweetImages.map((image, index) => (
            <Link key={index} to="/stores/1">
              <StaticPhoto src={image} />
            </Link>
          ))}
        </div>
      ) : (
        <ul className="shop-result-list">
          {filteredShops.map((item) => (
            <li key={item.storeId}>
              <Link
                to={`/stores/${item.storeId}`}
                className="shop-result-card"
              >
                <span className="shop-result-avatar" aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span className="shop-result-body">
                  <span className="shop-result-name">{item.name}</span>
                  <span className="shop-result-info">{item.info}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Search;