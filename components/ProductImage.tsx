import type { ProductWithStock } from "@/lib/types";

export function ProductImage({ product, large = false }: { product: ProductWithStock; large?: boolean }) {
  const className = large ? "product-image large" : "product-image";
  if (product.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={product.image} alt={product.name} className={className} />;
  }
  return (
    <div className={`${className} placeholder`} aria-hidden="true">
      {product.categoryEmoji}
    </div>
  );
}
