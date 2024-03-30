import type { Product } from "apps/commerce/types.ts";
import { HorizontalCard } from "$components/product/HorizontalCard.tsx";

export interface HorizontalProductSectionProps {
  products: Product[] | null;
}

const Horizontal = ({
  products,
}: HorizontalProductSectionProps) => {
  if (!products?.length) return null;

  return (
    <div class="flex items-center justify-center gap-x-4 flex-wrap">
      {products.map((product) => (
        <HorizontalCard product={product} />
      ))}
    </div>
  );
};

export default Horizontal;
