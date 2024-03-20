import { h, FunctionalComponent } from "preact";
import { ProductCard } from "./ProductCard";

interface IMainProduct {
  data: any;
}
export const MainProduct: FunctionalComponent<IMainProduct> = ({ data }) => {
  console.log("data", data);

  return (
    <div className="main-product p-4">
      <ProductCard product={data.product} />
    </div>
  );
};
