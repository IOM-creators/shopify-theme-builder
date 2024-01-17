import { h, FunctionalComponent } from "preact";
import cn from "classnames";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../button";
import { setPaginationState } from "../../state/collection";

interface IPagination {
  productsCount: number;
  perPage: number;
  typePagination: string;
}
export const Pagination: FunctionalComponent<IPagination> = ({
  productsCount,
  perPage,
  typePagination,
}) => {
  const [loading, setLoading] = useState(false);
  const [paginationData, setPaginationData] = useState<number>(1);
  const pages = Array.from(
    { length: Math.floor(productsCount / perPage) },
    (_, index) => index + 1
  );
  const handlePage = (page): void => {
    setLoading(true);
    if (page) {
      setPaginationData(page);
    } else {
      setPaginationData(paginationData + 1);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    setPaginationState(paginationData);
  }, [paginationData]);

  return (
    <div className="pagination py-5 text-center">
      {typePagination === "load_more" ? (
        <Button
          onClick={() => handlePage(null)}
          loading={loading}
          className="border p-3"
        >
          View more
        </Button>
      ) : (
        <ul className="flex justify-center">
          {pages.map((num) => (
            <li
              className="p-4 underline cursor-pointer"
              onClick={() => handlePage(num)}
            >
              {num}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
