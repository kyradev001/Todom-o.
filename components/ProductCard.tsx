import Link from "next/link";
import { formatPrice, stockLabel } from "@/lib/format";
import type { ProductWithStock } from "@/lib/types";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: ProductWithStock }) {
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;
  return (
    <Link href={`/producto/${product.slug}`} className="card">
      <ProductImage product={product} />
      <div className="card-body">
        {product.brand && <div className="brand">{product.brand}</div>}
        <h3>{product.name}</h3>
        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <>
              <s className="old-price">{formatPrice(product.compareAtPrice)}</s>
              <span className="badge">-{discount}%</span>
            </>
          )}
        </div>
        <div className={product.totalStock > 0 ? "stock ok" : "stock out"}>
          {stockLabel(product.totalStock)}
        </div>
      </div>
    </Link>
  );
}
