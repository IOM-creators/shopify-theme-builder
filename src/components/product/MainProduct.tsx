import { h, FunctionalComponent } from "preact";
import { ProductCard } from "./ProductCard";

interface IMainProduct {
  data: any;
}
export const MainProduct: FunctionalComponent<IMainProduct> = ({ data }) => {
  console.log("product", data);
  return (
    <div class="main-product p-4">
      <ProductCard product={data.product} />
    </div>
  );
};
