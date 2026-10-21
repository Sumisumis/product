export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Sweet {
  id: string;
  shopId: string;    
  sweetName: string;
  shopName: string; 
  category: string;
  price: number;
  description: string;
  tags: string[];
  imageUrl: string;
  coordinates: Coordinates;
}

export interface Store { //とりあえず3つのプロパティを追加したが、必要に応じてさらにプロパティを追加していく予定
  shopId: string;
  shopName: string;
  description: string; 
  //24行目以降、追加項目
  address: string;
  "business-hours": string;
  "regular-holiday": string;
  image_url: string;
  coordinates: Coordinates;
}
