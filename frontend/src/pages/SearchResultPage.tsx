import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiRefreshCw } from "react-icons/fi";
import ShopCard from "../components/ShopCard";
import SearchForm from "../components/SearchForm";

type ApiSweet = { id: string; shopId: string; sweetName: string; shopName?: string; category: string; price: number; image_url: string };
type ApiStore = { shopId: string; shopName: string; address: string; "business-hours": string; "regular-holiday": string; image_url: string };
type SearchData = { sweets: ApiSweet[]; stores: ApiStore[] };
type SearchState = SearchData & { query: string; status: "loading" | "ready" | "error" };

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword")?.trim() || "";
  const [state, setState] = useState<SearchState>({ query, sweets: [], stores: [], status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const status = state.query === query ? state.status : "loading";

  useEffect(() => {
    const controller = new AbortController();
    const endpoint = query ? `/api/search?keyword=${encodeURIComponent(query)}` : "/api/sweets";
    fetch(`http://localhost:3000${endpoint}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("検索データを取得できませんでした"); return response.json(); })
      .then((data: SearchData | ApiSweet[]) => {
        const results = Array.isArray(data) ? { sweets: data, stores: [] } : data;
        if (!Array.isArray(results.sweets) || !Array.isArray(results.stores)) throw new Error("検索結果の形式が正しくありません");
        setState({ ...results, query, status: "ready" });
      })
      .catch(() => { if (!controller.signal.aborted) setState({ query, sweets: [], stores: [], status: "error" }); });
    return () => controller.abort();
  }, [query, attempt]);

  const resultCount = state.sweets.length + state.stores.length;
  return <div className="page-stack">
    <Link to="/search" className="back-link"><FiArrowLeft />探す画面に戻る</Link>
    <SearchForm key={query} initialQuery={query} />
    <div className="section-heading results-heading"><div><p className="eyebrow">SEARCH RESULTS</p><h1>{query ? `「${query}」の検索結果` : "すべてのスイーツ"}</h1></div>
      {status === "ready" && <span className="result-count"><strong>{resultCount}</strong> 件</span>}
    </div>
    {status === "loading" && <div className="loading-state" role="status"><span className="loading-dot" />スイーツを探しています…</div>}
    {status === "error" && <div className="empty-state" role="alert"><span className="state-icon"><FiRefreshCw size={28} /></span><h2>情報を読み込めませんでした</h2><p>接続を確認して、もう一度お試しください。</p><button className="primary-link" onClick={() => { setState({ query, sweets: [], stores: [], status: "loading" }); setAttempt((n) => n + 1); }}>再読み込み<FiRefreshCw /></button></div>}
    {status === "ready" && <>
      {state.sweets.length > 0 && <section aria-label="スイーツの検索結果"><div className="results-grid">{state.sweets.map((item) => {
        const storeName = item.shopName ?? state.stores.find((store) => store.shopId === item.shopId)?.shopName ?? "";
        return <Link key={item.id} to={`/stores/${item.shopId}`} className="shop-card-link" aria-label={`${item.sweetName}、${item.price}円、店舗詳細を見る`}><ShopCard shop={{ name: storeName, address: "", time: "", category: item.category, price: String(item.price), holiday: "", image: item.image_url, sweets: [item.sweetName] }} /></Link>;
      })}</div></section>}
      {state.stores.length > 0 && <section aria-label="お店の検索結果"><div className="section-heading"><h2>お店の検索結果</h2><span className="section-note">{state.stores.length}件</span></div><div className="results-grid">{state.stores.map((store) =>
        <Link key={store.shopId} to={`/stores/${store.shopId}`} className="shop-card-link" aria-label={`${store.shopName}、店舗詳細を見る`}><ShopCard shop={{ name: store.shopName, address: store.address, time: store["business-hours"], category: "お店", price: "", holiday: store["regular-holiday"], image: store.image_url }} /></Link>
      )}</div></section>}
      {resultCount === 0 && <div className="empty-state"><span className="state-icon"><FiSearch size={28} /></span><h2>スイーツやお店が見つかりませんでした</h2><p>別の名前やカテゴリで探してみてください。</p><Link className="primary-link" to="/search">カテゴリから探す</Link></div>}
    </>}
  </div>;
}
