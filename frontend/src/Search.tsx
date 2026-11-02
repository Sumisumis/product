import { Link } from "react-router-dom";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import SearchForm from "./components/SearchForm";

const categories = [
  { name: "ケーキ", image: "ショートケーキ.jpg", caption: "ごほうびのひと皿" },
  { name: "和菓子", image: "dorayaki.jpg", caption: "ほっとする甘さ" },
  { name: "カフェスイーツ", image: "パンケーキ.jpg", caption: "ゆっくり、ひと休み" },
  { name: "プリン", image: "プリン.jpg", caption: "なめらかな口どけ" },
];

export default function Search() {
  return <div className="page-stack search-page">
    <div className="page-heading"><p className="eyebrow"><FiMapPin size={13} /> HAKODATE SWEETS GUIDE</p>
      <h1>今日は、どんな甘さにする？</h1><p>気になるスイーツと、お店を見つけよう。</p></div>
    <SearchForm />
    <section><div className="section-heading"><div><p className="eyebrow">BY CATEGORY</p><h2>気分から探す</h2></div></div>
      <div className="category-grid">{categories.map((category) => <Link key={category.name}
        to={`/search-result?keyword=${encodeURIComponent(category.name)}`} className="category-card">
        <img src={`${import.meta.env.BASE_URL}images/editorial/${category.image}`} alt="" loading="lazy" />
        <span className="category-card-content"><span><strong>{category.name}</strong><small>{category.caption}</small></span><FiArrowUpRight size={20} /></span>
      </Link>)}</div>
    </section>
    <section className="keyword-section"><div className="section-heading"><h2>キーワードから探す</h2></div>
      <div className="keyword-list">{["チョコ", "いちご", "モンブラン", "アイス", "チーズケーキ"].map((word) =>
        <Link key={word} to={`/search-result?keyword=${encodeURIComponent(word)}`}>{word}<FiArrowUpRight size={14} /></Link>)}</div>
    </section>
  </div>;
}
