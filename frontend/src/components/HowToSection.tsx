type HowToSectionProps = {
  number: number;
  title: string;
  description: string;
  mediaType?: "image" | "video";
  mediaSrc?: string;
};

export default function HowToSection({
  number,
  title,
  description,
  mediaType,
  mediaSrc,
}: HowToSectionProps) {
  return (
    <section className="howto-section">
      <div className="howto-number">{number}</div>

      <h2>{title}</h2>

      <div className="howto-media">
        {mediaSrc && mediaType === "image" && (
          <img src={mediaSrc} alt={title} />
        )}

        {mediaSrc && mediaType === "video" && (
          <video src={mediaSrc} controls />
        )}

        {!mediaSrc && (
          <div className="media-placeholder">
            ここに画像・動画を入れる
          </div>
        )}
      </div>

      <p>{description}</p>
    </section>
  );
}