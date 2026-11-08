
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ShopCard from "../components/ShopCard";
import SweetCard from "../components/SweetCard";
import { styles } from "../styles/styles";

// スイーツのデータ
type Sweet = {
  id: string;
  shopId: string;
  sweetName: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
};

// 店舗のデータ
type ApiStore = {
  shopId: string;
  shopName: string;
  description: string;
  address: string;
  "business-hours": string;
  "regular-holiday": string;
  image_url: string;
};

// ShopCardに渡すデータ
type Shop = {
  name: string;
  address: string;
  time: string;
  category: string;
  price: string;
  holiday: string;
  image: string;
};

export default function SearchResultPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const searchType = searchParams.get("type") || "sweets";

  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [stores, setStores] = useState<ApiStore[]>([]);
  const [loading, setLoading] = useState(false);

  // 検索タイプに応じてAPIを切り替える
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const endpoint =
          searchType === "shops"
            ? "stores"
            : "sweets";

        const url =
          `http://localhost:3000/api/${endpoint}?q=${encodeURIComponent(keyword)}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("データの取得に失敗しました");
        }

        const data = await res.json();

        if (searchType === "shops") {
          setStores(data);
          setSweets([]);
        } else {
          setSweets(data);
          setStores([]);
        }
      } catch (error) {
        console.error("検索結果の取得失敗:", error);
        setSweets([]);
        setStores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword, searchType]);

  // 店舗データをShopCard用に変換
  const mappedStores: Shop[] = stores.map((store) => ({
    name: store.shopName,
    address: store.address,
    time: store["business-hours"],
    category: store.description,
    price: "価格情報なし",
    holiday: store["regular-holiday"],
    image: store.image_url,
  }));

  const resultCount =
    searchType === "shops" ? stores.length : sweets.length;

  return (
    <div style={styles.body}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <main style={styles.main}>
        <div style={styles.searchInfo}>
          <h2 style={styles.searchKeyword}>
            「{keyword}」
          </h2>

          <p style={styles.searchCount}>
            全 {resultCount} 件
          </p>
        </div>

        {loading ? (
          <p>検索中...</p>
        ) : resultCount === 0 ? (
          <p>検索結果がありません。</p>
        ) : searchType === "shops" ? (
          // 店舗検索結果
          mappedStores.map((shop, index) => (
            <Link
              key={stores[index].shopId}
              to={`/stores/${stores[index].shopId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ShopCard shop={shop} />
            </Link>
          ))
        ) : (
          // スイーツ検索結果
          sweets.map((sweet) => (
            <Link
              key={sweet.id}
              to={`/stores/${sweet.shopId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <SweetCard sweet={sweet} />
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
