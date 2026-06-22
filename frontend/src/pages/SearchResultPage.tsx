import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ShopCard from "../components/ShopCard";
import { styles } from "../styles/styles";

/**
 * 🔥 バックエンドのデータ
 */
type ApiShop = {
  id: string;
  shopId: string;
  sweetName: string;
  shopName: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  imageUrl: string;
};

/**
 * 🔥 ShopCard用に変換した型
 */
type Shop = {
  storeId: string;
  name: string;
  address: string;
  time: string;
  category: string;
  price: string;
  holiday: string;
  image: string;
  sweets: string[];
};

export default function SearchResultPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(
    searchParams.get("keyword") || ""
  );

  const [shops, setShops] = useState<ApiShop[]>([]);

  const keyword =
    searchParams.get("keyword")?.trim().toLowerCase() || "";

  /**
   * 🔥 バックエンド取得
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/search");
        const data = await res.json();
        setShops(data);
      } catch (error) {
        console.error("取得失敗:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * 🔥 ShopCard用に変換
   */
  const mappedShops: Shop[] = shops.map((item) => ({
    storeId: item.shopId,
    name: item.shopName,
    address: "",
    time: "",
    category: item.category,
    price: String(item.price),
    holiday: "",
    image: item.imageUrl,
    sweets: [item.sweetName],
  }));

  /**
   * 🔥 フロント検索フィルター
   */
  const filteredShops = mappedShops.filter((shop) =>
    shop.name.toLowerCase().includes(keyword) ||
    shop.category.toLowerCase().includes(keyword) ||
    shop.sweets.some((s) =>
      s.toLowerCase().includes(keyword)
    )
  );

  const handleSearch = () => {
    navigate(
      `/search-result?keyword=${encodeURIComponent(query)}`
    );
  };

  return (
    <div style={styles.body}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <main style={styles.main}>
        {/* 🔍 search */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
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
              fontSize: "20px",
              border: "none",
              background: "transparent",
            }}
          >
            🔍
          </button>
        </div>

        {/* 🏪 results */}
        {filteredShops.map((shop) => (
          <Link
            key={shop.storeId}
            to={`/stores/${shop.storeId}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <ShopCard shop={shop} />
          </Link>
        ))}
      </main>
    </div>
  );
}