import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiRefreshCw } from "react-icons/fi";
import ShopCard from "../components/ShopCard";
import SearchForm from "../components/SearchForm";

type ApiShop = { id: string; shopId: string; sweetName: string; shopName: string; category: string; price: number; image_url: string };

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword")?.trim() || "";
  const keyword = query.toLowerCase();
  const [shops, setShops] = useState<ApiShop[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("http://localhost:3000/api/search", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("検索データを取得できませんでした"); return response.json(); })
      .then((data: ApiShop[]) => { setShops(data); setStatus("ready"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [attempt]);

  const filteredShops = shops.filter((shop) => [shop.shopName, shop.category, shop.sweetName].some((value) => value.toLowerCase().includes(keyword)));
  return <div className="page-stack">
    <Link to="/search" className="back-link"><FiArrowLeft />探す画面に戻る</Link>
    <SearchForm key={query} initialQuery={query} />
    <div className="section-heading results-heading"><div><p className="eyebrow">SEARCH RESULTS</p><h1>{query ? `「${query}」の検索結果` : "すべてのスイーツ"}</h1></div>
      {status === "ready" && <span className="result-count"><strong>{filteredShops.length}</strong> 件</span>}
    </div>
    {status === "loading" && <div className="loading-state" role="status"><span className="loading-dot" />スイーツを探しています…</div>}
    {status === "error" && <div className="empty-state" role="alert"><span className="state-icon"><FiRefreshCw size={28} /></span><h2>情報を読み込めませんでした</h2><p>接続を確認して、もう一度お試しください。</p><button className="primary-link" onClick={() => { setStatus("loading"); setAttempt((n) => n + 1); }}>再読み込み<FiRefreshCw /></button></div>}
    {status === "ready" && (filteredShops.length ? <div className="results-grid">{filteredShops.map((item) =>
      <Link key={item.id} to={`/stores/${item.shopId}`} className="shop-card-link"><ShopCard shop={{ name: item.shopName, address: "", time: "", category: item.category, price: String(item.price), holiday: "", image: item.image_url, sweets: [item.sweetName] }} /></Link>
    )}</div> : <div className="empty-state"><span className="state-icon"><FiSearch size={28} /></span><h2>スイーツが見つかりませんでした</h2><p>別の名前やカテゴリで探してみてください。</p><Link className="primary-link" to="/search">カテゴリから探す</Link></div>)}
  </div>;
}
