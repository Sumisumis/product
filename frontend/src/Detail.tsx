import { useCallback, useState } from "react";
//import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiInfo,
  FiMapPin,
} from "react-icons/fi";
import { LuCake } from "react-icons/lu";
import { TbCurrencyYen } from "react-icons/tb";

/** 画像どおりのクリーンなサンセリフ（日本語UI向け） */
const FONT =
  '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", "Meiryo", "Segoe UI", sans-serif';

const shopInfo = [
  {
    icon: <FiMapPin size={16} />,
    label: "住所",
    value: "北海道函館市○○町1-2-3",
  },
  {
    icon: <FiClock size={16} />,
    label: "営業時間",
    value: "10:00 ～ 20:00",
  },
  {
    icon: <LuCake size={16} />,
    label: "ジャンル",
    value: "カフェ・スイーツ",
  },
  {
    icon: <TbCurrencyYen size={16} />,
    label: "価格帯",
    value: "¥1,000〜¥2,000",
  },
  {
    icon: <FiInfo size={16} />,
    label: "お店情報",
    value:
      "函館の新鮮な素材を活かしたこだわりのスイーツを提供しています。落ち着いた店内でゆっくりとお過ごしください。",
  },
];

const menuItems = [
  { name: "チョコケーキ", price: "¥450" },
  { name: "抹茶パフェ", price: "¥600" },
  { name: "函館プリン", price: "¥350" },
];

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

/** 店舗写真（API連携時はここを差し替え） */
const STORE_PHOTOS = [
  {
    id: "exterior",
    src: unsplash("photo-1554118811-1e0d58224f24"),
    alt: "お店の外観",
  },
  {
    id: "interior",
    src: unsplash("photo-1556910103-1c02745aae4d"),
    alt: "店内",
  },
  {
    id: "sweets",
    src: unsplash("photo-1565958011703-44f9829ba187"),
    alt: "スイーツ",
  },
];

type StorePhoto = (typeof STORE_PHOTOS)[number];

const HERO_HEIGHT = 176;
/** 店舗詳細欄（content）の上余白と揃える */
const SECTION_GAP = 8;

function HeroCarousel({ photos }: { photos: StorePhoto[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = photos.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  if (count === 0) {
    return (
      <section style={styles.hero}>
        <div style={styles.heroViewport}>
          <div style={styles.heroPlaceholder}>写真がありません</div>
        </div>
      </section>
    );
  }

  const slideOffsetPercent = (activeIndex * 100) / count;

  return (
    <section
      style={styles.hero}
      aria-roledescription="carousel"
      aria-label="店舗写真"
    >
      <button
        type="button"
        style={styles.heroArrow}
        aria-label="前の写真"
        onClick={goPrev}
      >
        <FiChevronLeft size={18} />
      </button>

      <div style={styles.heroViewport}>
        <div
          style={{
            ...styles.heroTrack,
            width: `${count * 100}%`,
            transform: `translateX(-${slideOffsetPercent}%)`,
          }}
        >
          {photos.map((photo) => (
            <HeroSlide key={photo.id} photo={photo} count={count} />
          ))}
        </div>

        <div style={styles.heroDots}>
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`${index + 1}枚目の写真`}
              aria-current={index === activeIndex ? "true" : undefined}
              style={{
                ...styles.dot,
                ...(index === activeIndex ? styles.dotActive : {}),
              }}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        style={styles.heroArrow}
        aria-label="次の写真"
        onClick={goNext}
      >
        <FiChevronRight size={18} />
      </button>
    </section>
  );
}

function HeroSlide({ photo, count }: { photo: StorePhoto; count: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        ...styles.heroSlide,
        width: `${100 / count}%`,
      }}
    >
      {failed ? (
        <div style={styles.heroPlaceholder}>{photo.alt}</div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          style={styles.heroImage}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

const Detail = () => {
 // const navigate = useNavigate();

  return (
    <div>
      <HeroCarousel photos={STORE_PHOTOS} />

      <main style={styles.content}>
        <section style={styles.card}>
          {shopInfo.map((item) => (
            <div key={item.label} style={styles.infoRow}>
              <div style={styles.infoIcon}>{item.icon}</div>
              <div style={styles.infoBody}>
                <div style={styles.infoLabel}>{item.label}</div>
                <div style={styles.infoValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>メニュー</h2>
          <div style={styles.menuGrid}>
            {menuItems.map((item) => (
              <article key={item.name} style={styles.menuItem}>
                <div style={styles.menuImage}>画像</div>
                <h3 style={styles.menuName}>{item.name}</h3>
                <p style={styles.menuPrice}>{item.price}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  hero: {
    height: HERO_HEIGHT,
    marginTop: 0,
    backgroundColor: "#f2eee6",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 10px",
    position: "relative" as const,
    boxSizing: "border-box" as const,
  },
  heroViewport: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative" as const,
    backgroundColor: "#f2eee6",
  },
  heroTrack: {
    display: "flex",
    height: "100%",
    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
  },
  heroSlide: {
    flexShrink: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2eee6",
  },
  heroImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain" as const,
    display: "block",
  },
  heroPlaceholder: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    backgroundColor: "#f2eee6",
    color: "#a89585",
    fontSize: 13,
    fontFamily: FONT,
  },
  heroArrow: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f8f8f8",
    color: "#c5a58b",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    flexShrink: 0,
    zIndex: 2,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
  },
  heroDots: {
    position: "absolute" as const,
    left: 0,
    right: 0,
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    gap: 6,
    zIndex: 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    border: "none",
    padding: 0,
    cursor: "pointer",
  },
  dotActive: {
    backgroundColor: "#c7a58b",
    transform: "scale(1.15)",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: SECTION_GAP,
    padding: `0 0 12px`,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  infoRow: {
    display: "flex",
    gap: 10,
    padding: "7px 0",
    borderBottom: "1px solid #f2f2f2",
  },
  infoIcon: {
    width: 20,
    display: "grid",
    placeItems: "center",
    color: "#c7a58b",
    marginTop: 2,
  },
  infoBody: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: FONT,
    color: "#b6b2ad",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: FONT,
    color: "#332725",
    lineHeight: 1.45,
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#3c2d24",
    borderLeft: "4px solid #d1b298",
    paddingLeft: 8,
    fontFamily: FONT,
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  menuItem: { margin: 0 },
  menuImage: {
    height: 86,
    borderRadius: 10,
    backgroundColor: "#efefef",
    display: "grid",
    placeItems: "center",
    color: "#c5c5c5",
    fontSize: 12,
    marginBottom: 8,
  },
  menuName: {
    margin: "0 0 2px",
    fontSize: 15,
    fontWeight: 600,
    fontFamily: FONT,
    color: "#362822",
  },
  menuPrice: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: FONT,
    color: "#c49f83",
  },
};

export default Detail;
