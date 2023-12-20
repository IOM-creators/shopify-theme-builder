import { h, FunctionalComponent, Fragment } from "preact";
import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";
import { Image } from "../image";

interface ICollection {
  settings?: any;
}
export const Collection: FunctionalComponent<ICollection> = ({ settings }) => {
  const data = getData(getCollection("frontpage"));
  console.log("data", data);
  console.log("settings", settings);
  if (!data?.collection) return null;

  const collection = data.collection;
  const products = collection.products.nodes.map((node) => node);
  return (
    <div class="collection">
      {settings.banner && (
        <div className="collection__banner relative">
          {collection.image && (
            <Image image={collection.image} className="before:pt-[50%]" />
          )}
          <h1 className="text-5xl absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
            {collection.title}
          </h1>
        </div>
      )}
      <div className="collection__container container p-20">
        <div className="collection__products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
