import Image from "next/image";
import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Ark Masterpiece home">
      <span className="brand-symbol" aria-hidden="true">
        <Image
          src="/brand/ark-masterpiece-logo.webp"
          alt=""
          width={1280}
          height={1280}
          sizes="72px"
        />
      </span>
      <span className="brand-copy">
        <span className="brand-name">Ark Masterpiece</span>
        <span className="brand-tagline">
          Virtual Assistance & Digital Marketing
        </span>
      </span>
    </Link>
  );
}
