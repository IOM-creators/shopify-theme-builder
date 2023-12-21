import { h, FunctionalComponent, Fragment } from "preact";
import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";
import { getData } from "../../helpers/get-data";
import { Image } from "../image";
import { SortSelect } from "./SortSelect";
import { useEffect, useState } from "preact/hooks";
import { Filters } from "./Filters";
interface ICollection {
  settings?: any;
}
type priceTypes = {
  min: number;
  max: number;
};
export const Collection: FunctionalComponent<ICollection> = ({ settings }) => {
  const [sortType, setSortType] = useState(null);
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCollection(settings.handle, sortType, minPrice, maxPrice).then((res) => {
      setData(res);
    });
  }, [sortType, minPrice, maxPrice]);

  if (!data?.collection) return null;

  const collection = data.collection;
  const products = collection.products.nodes.map((node) => node);
  return (
    <div className="collection">
      {settings.banner ? (
        <div className="collection__banner relative">
          {collection.image && (
            <Image image={collection.image} className="before:pt-[30%]" />
          )}
          <h1 className="text-5xl absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white-05 p-4">
            {collection.title}
          </h1>
        </div>
      ) : (
        <div className="collection__header pt-10 text-center max-w-screen-md mx-auto container">
          <h1 className="collection__title text-5xl text-center">
            {collection.title}
          </h1>
          <div className="collection__description mt-4">
            {collection.description}
          </div>
        </div>
      )}
      <div className="collection__container container py-20">
        <div className="collection__filters grid grid-cols-2 py-6 relative">
          <Filters setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
          <SortSelect setSortType={setSortType} className="justify-self-end" />
        </div>
        <div className="collection__products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard
              product={product}
              isAddBtn={settings.isAddBtn}
              isDescription={settings.isDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
