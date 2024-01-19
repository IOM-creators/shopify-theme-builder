import { h, FunctionalComponent } from "preact";
import cn from "classnames";

import { ProductCard } from "../product/ProductCard";
import { getCollection } from "../../storefront/graphql/send-request";
import {
  getCollectionState,
  setCollectionState,
  subscribeToCollectionState,
  getFiltersState,
  subscribeToFiltersState,
  subscribeToSortState,
  getSortState,
  subscribeToPaginationState,
  getPaginationState,
} from "../../state/collection";
import { Image } from "../image";
import { SortSelect } from "./SortSelect";
import { useEffect, useState } from "preact/hooks";
import { Filters } from "./Filters";
import { Pagination } from "./Paginations";
interface ICollection {
  settings?: any;
}
export const Collection: FunctionalComponent<ICollection> = ({ settings }) => {
  const [collectionState, setLocalCollectionState] =
    useState(getCollectionState);
  const [filtersState, setLocalFiltersState] = useState(getFiltersState);
  const [sortState, setLocalSortState] = useState(getSortState);
  const [paginationState, setLocalPaginationState] =
    useState(getPaginationState);
  const [products, setProducts] = useState([]);
  const [numbersPagination] = useState(settings.type_pagination === "numbers");
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    const callback = (newCollectionState) => {
      setLocalCollectionState(newCollectionState);
    };
    subscribeToCollectionState(callback);
    return () => {
      subscribeToCollectionState(null);
    };
  }, []);

  useEffect(() => {
    const callback = (newFiltersState) => {
      setLocalFiltersState(newFiltersState);
    };
    subscribeToFiltersState(callback);
    return () => {
      subscribeToFiltersState(null);
    };
  }, []);

  useEffect(() => {
    const callback = (newPaginationState) => {
      setLocalPaginationState(newPaginationState);
    };
    subscribeToPaginationState(callback);
    return () => {
      subscribeToPaginationState(null);
    };
  }, []);

  useEffect(() => {
    const callback = (newSortState) => {
      setLocalSortState(newSortState);
    };
    subscribeToSortState(callback);
    return () => {
      subscribeToSortState(null);
    };
  }, []);

  useEffect(() => {
    getCollection(
      settings.handle,
      settings.porudcts_per_page * paginationState,
      filtersState,
      sortState
    ).then((res) => {
      setCollectionState(res);
      numbersPagination
        ? setShowPagination(numbersPagination)
        : setShowPagination(res.collection.products.pageInfo.hasNextPage);

      if (numbersPagination) {
        if (paginationState > 1) {
          setProducts(
            res.collection.products.nodes.filter(
              (p, ind) =>
                ind + 1 > settings.porudcts_per_page * (paginationState - 1)
            )
          );
        } else {
          setProducts(
            res.collection.products.nodes.filter(
              (p, ind) => ind < settings.porudcts_per_page * paginationState
            )
          );
        }
      } else {
        setProducts(res.collection.products.nodes);
      }
    });
  }, [filtersState, sortState, paginationState]);

  if (!collectionState?.collection) return null;

  const collection = collectionState.collection;
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
          { "loading before:bg-white-05 before:z-10": false },
          "collection__container container py-20"
        )}
      >
        <div className="collection__filters grid grid-cols-2 py-6 relative">
          {collection?.products?.filters && (
            <Filters filters={collection.products.filters} />
          )}
          <SortSelect className="justify-self-end" />
        </div>
        <div className="collection__products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
