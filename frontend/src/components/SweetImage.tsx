import { useState } from "react";
import { LuCake } from "react-icons/lu";

type Props = { src: string; alt: string; className?: string; eager?: boolean };

export default function SweetImage({ src, alt, className = "", eager = false }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src) {
    return <div className={`image-placeholder ${className}`} role="img" aria-label={`${alt}（画像準備中）`}>
      <LuCake size={30} aria-hidden="true" /><span>画像準備中</span>
    </div>;
  }
  return <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"}
    decoding="async" onError={() => setFailedSrc(src)} />;
}
