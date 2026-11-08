type Sweet = {
  id: string;
  sweetName: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
};

type Props = {
  sweet: Sweet;
};

export default function SweetCard({ sweet }: Props) {
  return (
    <div style={{
      display: "flex",
      gap: "15px",
      padding: "15px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      backgroundColor: "white"
    }}>
      <div style={{ flex: 1 }}>
        <h3>{sweet.sweetName}</h3>
        <p>{sweet.category}</p>
        <p>{sweet.price}円</p>
        <p>{sweet.description}</p>
      </div>

      <img
        src={sweet.image_url}
        alt={sweet.sweetName}
        style={{
          width: "110px",
          height: "110px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}