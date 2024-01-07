import { h, FunctionalComponent } from "preact";
import cn from "classnames";

import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";
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
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("TITLE");
  const [dataFilters, setDataFilters] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCollection(
      settings.handle,
      sortType,
      dataFilters,
      settings.porudcts_per_page
    ).then((res) => {
      setData(res);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [sortType, dataFilters]);

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
      <div
        className={cn(
          { "loading before:bg-white-05 before:z-10": loading },
          "collection__container container py-20"
        )}
      >
        <div className="collection__filters grid grid-cols-2 py-6 relative">
          {collection?.products?.filters && (
            <Filters
              filters={collection.products.filters}
              setDataFilters={setDataFilters}
              dataFilters={dataFilters}
            />
          )}
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
