import Link from "next/link";
// Keep the approved business name as typography until the exact logo file is supplied.
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Ark Masterpiece home">
      <span className="brand-name">Ark Masterpiece</span>
      <span className="brand-tagline">
        Virtual Assistance & Digital Marketing
      </span>
    </Link>
  );
}
