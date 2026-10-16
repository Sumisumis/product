// スイーツとカテゴリをセットで管理
const sweetData = [
  { name: "いちごショートケーキ", category: "洋菓子" },
  { name: "チョコレートケーキ", category: "洋菓子" },
  { name: "モンブラン", category: "洋菓子" },
  { name: "シュークリーム", category: "洋菓子" },
  { name: "プリン", category: "洋菓子" },

  { name: "どら焼き", category: "和菓子" },
  { name: "大福", category: "和菓子" },

  { name: "抹茶アイス", category: "アイス" },
  { name: "バニラアイス", category: "アイス" },

  { name: "クッキー", category: "焼き菓子" },
  { name: "アップルパイ", category: "焼き菓子" },

  { name: "パンケーキ", category: "カフェスイーツ" },
  { name: "ティラミス", category: "カフェスイーツ" },

  { name: "チーズケーキ", category: "洋菓子" },
  { name: "ロールケーキ", category: "洋菓子" }
];

// タグ候補
const tagsList = [
  ["人気"],
  ["期間限定"],
  ["テイクアウト可"],
  ["SNS映え"]
];

// ランダム取得
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}
// 店舗データ（10店舗）
const shops = Array.from({ length: 10 }, (_, i) => ({
  shopId: `shop${String(i + 1).padStart(2, "0")}`,
  shopName: `スイーツ店${i + 1}`,
  lat: 43.06 + i * 0.01,
  lng: 141.34 + i * 0.01
}));

// スイーツ生成（100件）
const sweets = shops.flatMap((shop, i) =>
  Array.from({ length: 10 }, (_, j) => {
    const sweet = getRandom(sweetData); // ←ここでセット取得

    return {
      id: `s${String(i * 10 + j + 1).padStart(3, "0")}`,
      shopId: shop.shopId,
      sweetName: sweet.name,
      category: sweet.category,
      price: 300 + Math.floor(Math.random() * 500),
      description: "人気のスイーツです",
      tags: getRandom(tagsList),
      imageUrl: `/images/sweets/${j + 1}.jpg`,
    };
  })
);

// JSONとして出力
console.log(JSON.stringify(sweets, null, 2));

