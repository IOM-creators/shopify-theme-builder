import { h, FunctionalComponent } from "preact";
import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";

interface ICollection {
  products?: any;
}
export const Collection: FunctionalComponent<ICollection> = () => {
  const data = getData(getCollection("frontpage"));
  console.log("data", data);
  const products = data?.collection
    ? data.collection?.products?.nodes?.map((node) => node)
    : [];
  return (
    <div class="collection p-10">
      <div className="collection__banner"></div>
      <div className="collection__products grid grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
