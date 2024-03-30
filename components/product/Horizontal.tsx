// sections/Product/HorizontalProducts.tsx

import type { Product } from "apps/commerce/types.ts";
import { HorizontalCard } from "$components/product/HorizontalCard.tsx";
import { asset } from "$fresh/runtime.ts";

export interface HorizontalProductSectionProps {
  products: Product[] | null;
  animation: boolean;
  layout: "max-w-xl" | "max-w-2xl" | "max-w-3xl"| "max-w-4xl" | "max-w-5xl" |  "max-w-6xl" |  "max-w-7xl" | "max-w-full"
}

export function loader(props: HorizontalProductSectionProps, _req: Request) {
  // throw new Error("Not implemented");

  return props;
}

const Horizontal = ({
  products,
  animation,
  layout
}: HorizontalProductSectionProps) => {
  if (!products?.length) return null;

  return (
    <div class={`w-full ${layout} px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10`}>
      {products.map((product) => (
        <HorizontalCard animation={animation} product={product} />
      ))}
    </div>
  );
};

export function LoadingFallback() {
  return (
    <div class="skeleton shrink-0 w-full h-[190px] m-2 max-w-[1366px] mx-auto"/>
  );
}


export function ErrorFallback({ error: _error }: { error?: Error }) {
  return (
    <div class="flex flex-col mx-auto max-w-96">
      <img
        class={"mb-2"}
        src={asset("/comidas.jpg")}
        alt={"Error"}
        height={400}
        width={400}
      />
      <p class={"mb-2"}>{_error?.message}</p>
      <a
        href="/cultura"
        class="btn btn-block bg-transparent hover:bg-primary border border-white hover:border-transparent"
      >
        Para Saber mais
      </a>
    </div>
  );
}

export default Horizontal;