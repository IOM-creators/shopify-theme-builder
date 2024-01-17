import { h, FunctionalComponent } from "preact";
import cn from "classnames";
import { useState } from "preact/hooks";
import { Button } from "../button";

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
  const pages = Array.from(
    { length: Math.floor(productsCount / perPage) },
    (_, index) => index + 1
  );
  const handlePage = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  return (
    <div className="pagination py-5 text-center">
      {typePagination === "load_more" ? (
        <Button onClick={handlePage} loading={loading} className="border p-3">
          View more
        </Button>
      ) : (
        <ul className="flex justify-center">
          {pages.map((num) => (
            <li className="p-4 underline">{num}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
