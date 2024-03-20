import { h, FunctionalComponent } from "preact";
import cn from "classnames";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../button";
import { setPaginationState } from "../../store/collection";

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
  const [activePage, setActivePage] = useState(1);
  const [paginationData, setPaginationData] = useState<number>(1);
  const pages = Array.from(
    { length: Math.ceil(productsCount / perPage) },
    (_, index) => index + 1
  );
  const handlePage = (page): void => {
    setLoading(true);
    if (page) {
      setPaginationData(page);
      setActivePage(page);
    } else {
      setPaginationData(paginationData + 1);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setPaginationState(paginationData);
  }, [paginationData]);

  return (
    <div className="pagination py-5 text-center mt-5">
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
              className={cn(
                { border: activePage === num },
                "px-4 py-2 cursor-pointer"
              )}
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
