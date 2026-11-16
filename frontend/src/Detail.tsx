import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiInfo,
  FiMapPin,
} from "react-icons/fi";

// jsonファイルを直接読み込んでます
import storesData from "../../backend/src/mocks/stores.json";
import sweetsData from "../../backend/src/mocks/sweets.json";

export interface Store {
  shopId: string;
  shopName: string;
  description: string;
  address: string;
  "business-hours": string;
  "regular-holiday": string;
  image_url: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SweetItem {
  id: string;
  shopId: string;
  sweetName: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
  image_url: string;
}

interface StorePhoto {
  id: string;
  src: string;
  alt: string;
}

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
      <section className="detail-hero">
        <div className="detail-hero-viewport">
          <div className="detail-hero-placeholder">写真がありません</div>
        </div>
      </section>
    );
  }

  const slideOffsetPercent = (activeIndex * 100) / count;

  return (
    <section
      className="detail-hero"
      aria-roledescription="carousel"
      aria-label="店舗写真"
    >
      <button
        type="button"
        className="detail-hero-arrow"
        aria-label="前の写真"
        onClick={goPrev}
      >
        <FiChevronLeft size={18} />
      </button>

      <div className="detail-hero-viewport">
        <div
          className="detail-hero-track"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(-${slideOffsetPercent}%)`,
          }}
        >
          {photos.map((photo) => (
            <HeroSlide key={photo.id} photo={photo} count={count} />
          ))}
        </div>

        <div className="detail-hero-dots">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`${index + 1}枚目の写真`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`detail-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="detail-hero-arrow"
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
      className="detail-hero-slide"
      style={{ width: `${100 / count}%` }}
    >
      {failed ? (
        <div className="detail-hero-placeholder">{photo.alt}</div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          className="detail-hero-image"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

const Detail = () => {
  const params = useParams<Record<string, string | undefined>>();
  const targetId = params.shopId || Object.values(params)[0] || "shop01";

  // デバッグ用
  //console.log("URLから取得したターゲットID:", targetId);

  //stores.json から一致する店舗を検索
  const currentStore = (storesData as Store[]).find(
    (s) => s.shopId === targetId
  );

  // 該当する店舗が見つからない場合のエラー表示
  if (!currentStore) {
    return (
      <div className="detail-layout">
        <Link to="/search" className="back-link">
          <FiChevronLeft />
          スイーツを探す
        </Link>
        <div className="empty-state">
          <h2>店舗が見つかりませんでした</h2>
          <p>指定された店舗（ID: {targetId}）の情報は存在しません。</p>
        </div>
      </div>
    );
  }

  //sweets.json から該当店舗のメニューだけを抽出
  const storeSweets = (sweetsData as SweetItem[]).filter(
    (sweet) => sweet.shopId === currentStore.shopId
  );

  const storePhotos: StorePhoto[] = [
    {
      id: "main",
      src: currentStore.image_url,
      alt: currentStore.shopName,
    },
  ];

  const shopInfo = [
    {
      icon: <FiMapPin size={16} />,
      label: "住所",
      value: currentStore.address,
    },
    {
      icon: <FiClock size={16} />,
      label: "営業時間",
      value: currentStore["business-hours"],
    },
    {
      icon: <FiCalendar size={16} />,
      label: "定休日",
      value: currentStore["regular-holiday"],
    },
    {
      icon: <FiInfo size={16} />,
      label: "お店情報",
      value: currentStore.description,
    },
  ];

  return (
    <div className="detail-layout">
      <Link to="/search" className="back-link">
        <FiChevronLeft />
        スイーツを探す
      </Link>
      <div className="detail-intro">
        <p className="eyebrow">SHOP INFORMATION</p>
        <h1>{currentStore.shopName}</h1>
      </div>

      <HeroCarousel photos={storePhotos} />

      <div className="detail-content">
        <section className="detail-card">
          {shopInfo.map((item) => (
            <div key={item.label} className="detail-info-row">
              <div className="detail-info-icon">{item.icon}</div>
              <div className="detail-info-body">
                <div className="detail-info-label">{item.label}</div>
                <div className="detail-info-value">{item.value}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="detail-card">
          <h2 className="detail-section-title">メニュー</h2>
          <div className="detail-menu-grid">
            {storeSweets.map((sweet) => (
              <article key={sweet.id} className="detail-menu-item">
                <div className="detail-menu-thumb">
                  <img
                    src={sweet.image_url}
                    alt={sweet.sweetName}
                    className="detail-menu-image"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <h3 className="detail-menu-name">{sweet.sweetName}</h3>
                <p className="detail-menu-price">
                  ¥{sweet.price.toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;