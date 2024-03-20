import { h, FunctionalComponent } from "preact";
import cn from "classnames";

import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";

import { Image } from "../image";
import { SortSelect } from "./SortSelect";
import { useEffect, useState } from "preact/hooks";
import { Filters } from "./Filters";
import { Pagination } from "./Paginations";
import { useGlobalState } from "../../GlobalStateContext";
interface ICollection {
  settings?: any;
}
export const Collection: FunctionalComponent<ICollection> = ({ settings }) => {
  const [products, setProducts] = useState([]);
  const [numbersPagination] = useState(settings.type_pagination === "numbers");
  const [showPagination, setShowPagination] = useState(false);
  const [loading, setLoading] = useState(false);
  const { globalState, setCollection } = useGlobalState();

  useEffect(() => {
    setLoading(true);
    getCollection(settings.handle, settings.porudcts_per_page * 1).then(
      (res) => {
        setCollection({ ...res.collection });
        console.log("globalState", globalState);

        numbersPagination
          ? setShowPagination(numbersPagination)
          : setShowPagination(res.collection.products.pageInfo.hasNextPage);

        if (numbersPagination) {
          if (1 > 1) {
            setProducts(
              res.collection.products.nodes.filter(
                (p, ind) => ind + 1 > settings.porudcts_per_page * (1 - 1)
              )
            );
          } else {
            setProducts(
              res.collection.products.nodes.filter(
                (p, ind) => ind < settings.porudcts_per_page * 1
              )
            );
          }
        } else {
          setProducts(res.collection.products.nodes);
        }
        setLoading(false);
      }
    );
  }, []);

  if (!globalState.collection) return <div>Empty</div>;

  const collection = globalState.collection;
  return (
    <div className="collection">
      {settings.banner ? (
        <div className="collection__banner relative">
          {collection.image && (
            <Image image={collection.image} className="md:before:pt-[30%]" />
          )}
          <h1 className="text-center text-5xl absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white-05 p-4">
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
          {
            "loading before:bg-white-05 before:bg-40 before:z-10": loading,
          },
          "collection__container container py-5 md:py-20"
        )}
      >
        <div className="collection__filters grid grid-cols-2 py-6 relative">
          {collection?.products?.filters && (
            <Filters filters={collection.products.filters} />
          )}
          <SortSelect className="justify-self-end" />
        </div>
        <div className="collection__products grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 md:gap-x-6 md:gap-y-10">
          {products.map((product) => (
            <ProductCard
              product={product}
              isAddBtn={settings.is_add_btn}
              isDescription={settings.is_description}
            />
          ))}
        </div>
        {showPagination && (
          <Pagination
            productsCount={settings.all_products_count}
            perPage={settings.porudcts_per_page}
            typePagination={settings.type_pagination}
          />
        )}
      </div>
    </div>
  );
};
