import { useSignal } from "@preact/signals";
import Icon from "$components/ui/Icon.tsx";
import { invoke } from "deco-sites/decocampgalego/runtime.ts";
import { total } from "$sdk/useTotalLikes.ts";
import { useEffect, useId } from "preact/hooks";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SendEventOnClick } from "deco-sites/decocampgalego/components/Analytics.tsx";

export interface LikeButtonIslandProps {
  productID: string;
}

function LikeButton({ productID }: LikeButtonIslandProps) {
  const selected = useSignal(false);
  const quantity = useSignal(0);

  const Toast = ToastContainer as any;

  const id = useId();

  useEffect(() => {
    const updateTotals = async () => {
      const totalLikes = await invoke["deco-sites/decocampgalego"].loaders
        .totalLikesLoader();
      const totalLikesProduct = await invoke["deco-sites/decocampgalego"]
        .loaders
        .totalLikesProductLoader({ productID });
      total.value = totalLikes.total;
      quantity.value = totalLikesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  });

  const handleToggleLike = async (e: MouseEvent) => {
    e.preventDefault();
    selected.value = true;

    await invoke["deco-sites/decocampgalego"].actions.sendLikesAction({
      productID: productID,
    });

    const totalLikes = await invoke["deco-sites/decocampgalego"].loaders
      .totalLikesLoader();
    total.value = totalLikes.total;
    const totalLikesProduct = await invoke["deco-sites/decocampgalego"].loaders
      .totalLikesProductLoader({ productID });
    quantity.value = totalLikesProduct.product;
    toast.success("👍 Curtiu meeeeeu!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <button
        id={id}
        class="absolute left-4 sm:left-auto sm:right-4 top-4 flex items-center justify-center gap-1 p-1 sm:p-2 rounded bg-neutral sm:bg-white min-w-14"
        onClick={(e) => handleToggleLike(e)}
      >
        <SendEventOnClick
          id={id}
          event={{
            // @ts-ignore:
            name: "post_score",
            params: {
              // @ts-ignore:
              score: quantity.value + 1,
              level: 5,
              character: String(productID),
            },
          }}
        />
        {!selected.value
          ? <Icon id="MoodSmile" width={24} height={24} />
          : <Icon id="MoodCheck" width={24} height={24} />}
        <span
          class={`min-w-4 text-center text-xs font-thin ${
            !selected.value ? "text-gray-500" : "text-secondary"
          }`}
        >
          {quantity.value}
        </span>
      </button>

      <Toast />
    </>
  );
}

export default LikeButton;
