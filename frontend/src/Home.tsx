import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin, FiCalendar, FiRefreshCw } from "react-icons/fi";
import SearchForm from "./components/SearchForm";
import SweetImage from "./components/SweetImage";

interface FeatureArticle {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
}

interface SweetProduct {
  id: string;
  shopId: string;
  sweetName: string;
  shopName: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image_url: string;
  coordinates: { lat: number; lng: number };
}

interface LimitedStore {
  hasStore: boolean;
  shopId: string;
  shopName: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
}

interface HomeData {
  features: FeatureArticle[];
  newSweets: SweetProduct[];
  limitedStore: LimitedStore;
}

const assetUrl = (url: string) => url.startsWith("/images/") ? `http://localhost:3000${url}` : url;

function NewSweetsCarousel({ sweets }: { sweets: SweetProduct[] }) {
  const track = useRef<HTMLDivElement>(null);
  return <section>
    <div className="section-heading"><div><p className="eyebrow">SWEET DISCOVERIES</p><h2>新しいおいしさ、見つけた。</h2></div>
      <div className="carousel-controls">
        <button className="icon-button" aria-label="前の商品" onClick={() => track.current?.scrollBy({ left: -track.current.clientWidth * 0.8, behavior: "smooth" })}><FiChevronLeft /></button>
        <button className="icon-button" aria-label="次の商品" onClick={() => track.current?.scrollBy({ left: track.current.clientWidth * 0.8, behavior: "smooth" })}><FiChevronRight /></button>
      </div>
    </div>
    {sweets.length === 0 ? <div className="notice-card">新商品の情報は準備中です。</div> : <div className="sweets-rail" ref={track} aria-label="新商品">
      {sweets.map((sweet) => <Link to={`/stores/${sweet.shopId}`} key={sweet.id} className="sweet-card">
        <div className="sweet-image-wrap"><SweetImage src={assetUrl(sweet.image_url)} alt={sweet.sweetName} className="sweet-image" /><span className="sweet-badge">NEW</span></div>
        <div className="sweet-body"><span className="category-label">{sweet.category}</span><h3>{sweet.sweetName}</h3><p>{sweet.shopName}</p><strong>¥{sweet.price.toLocaleString("ja-JP")}</strong></div>
      </Link>)}
    </div>}
  </section>;
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("http://localhost:3000/api/home", { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("ホーム情報を取得できませんでした"); return response.json(); })
      .then((data: HomeData) => { setHomeData(data); setStatus("ready"); })
      .catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [attempt]);

  return <div className="page-stack home-page">
    <section className="home-hero">
      <img className="hero-photo" src={`${import.meta.env.BASE_URL}images/editorial/ショートケーキ.jpg`} alt="いちごとクリームを重ねたショートケーキ" fetchPriority="high" />
      <div className="hero-copy"><span className="hero-location"><FiMapPin size={13} />函館のスイーツガイド</span>
        <h1>函館で見つける、<br />甘いしあわせ。</h1><p>いつもの街に、まだ知らないおいしさ。<br />今日のひとくちを探しに行こう。</p>
        <Link to="/search" className="hero-link">スイーツを探す<FiArrowRight size={18} /></Link>
      </div>
    </section>
    <div className="home-search"><SearchForm /><div className="quick-keywords"><span>気になる甘さ</span>{["ケーキ", "和菓子", "カフェスイーツ"].map((word) => <Link key={word} to={`/search-result?keyword=${encodeURIComponent(word)}`}>{word}<FiArrowRight size={12} /></Link>)}</div></div>
    {status === "loading" && <div className="loading-state" role="status"><span className="loading-dot" />スイーツの情報を読み込んでいます…</div>}
    {status === "error" && <div className="notice-card" role="alert"><div><h2>最新の情報を読み込めませんでした</h2><p>接続を確認して、もう一度お試しください。</p></div><button className="text-button" onClick={() => { setStatus("loading"); setAttempt((n) => n + 1); }}><FiRefreshCw />再読み込み</button></div>}
    {homeData && <>
      <NewSweetsCarousel sweets={homeData.newSweets} />
      <section><div className="section-heading"><div><p className="eyebrow">SWEETS JOURNAL</p><h2>季節のおいしい読みもの</h2></div><span className="section-note">特集</span></div>
        <div className="feature-grid">{homeData.features.map((article) => <a href={article.link_url} key={article.id} className="feature-card">
          <SweetImage src={assetUrl(article.image_url)} alt={article.title} className="feature-card-image" />
          <div className="feature-card-body"><span className="category-label">季節の特集</span><h3>{article.title}</h3><span className="feature-card-link">続きを読む<FiArrowRight /></span></div>
        </a>)}</div>
      </section>
      <section><div className="section-heading"><div><p className="eyebrow">POP-UP INFORMATION</p><h2>期間限定のお楽しみ</h2></div></div>
        {!homeData.limitedStore.hasStore ? <div className="notice-card">現在、期間限定出店のお知らせはありません。</div> :
          <Link to={`/stores/${homeData.limitedStore.shopId}`} className="limited-store-card">
            <SweetImage src={assetUrl(homeData.limitedStore.image_url)} alt={homeData.limitedStore.shopName} className="limited-store-image" />
            <div className="limited-store-body"><span className="category-label">期間限定出店</span><h3>{homeData.limitedStore.shopName}</h3><p>{homeData.limitedStore.description}</p>
              <div className="event-meta"><span><FiCalendar />{homeData.limitedStore.date}</span><span><FiMapPin />{homeData.limitedStore.location}</span></div>
            </div><FiChevronRight className="limited-store-arrow" />
          </Link>}
      </section>
    </>}
    <footer className="page-footer">ちょこはこ<span>函館で見つける、甘いしあわせ。</span></footer>
  </div>;
}
