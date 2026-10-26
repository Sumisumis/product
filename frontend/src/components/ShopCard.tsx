import { FiMapPin, FiClock, FiChevronRight } from "react-icons/fi";
import SweetImage from "./SweetImage";

type Shop = { name: string; address: string; time: string; category: string; price: string; holiday: string; image: string; sweets?: string[] };

export default function ShopCard({ shop }: { shop: Shop }) {
  const numericPrice = Number(shop.price);
  return <article className="shop-card">
    <SweetImage src={shop.image} alt={shop.sweets?.[0] ?? shop.name} className="shop-card-image" />
    <div className="shop-card-body"><span className="category-label">{shop.category}</span>
      <h2>{shop.sweets?.[0] ?? shop.name}</h2>
      {shop.sweets?.length ? <p className="shop-card-name">{shop.name}</p> : null}
      {shop.address && <p className="shop-card-meta"><FiMapPin />{shop.address}</p>}
      {shop.time && <p className="shop-card-meta"><FiClock />{shop.time}</p>}
      {shop.holiday && <p className="shop-card-meta">定休日：{shop.holiday}</p>}
      <div className="shop-card-footer"><strong>{Number.isFinite(numericPrice) ? `¥${numericPrice.toLocaleString("ja-JP")}` : shop.price}</strong><FiChevronRight size={18} /></div>
    </div>
  </article>;
}
