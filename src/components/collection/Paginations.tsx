import { h, FunctionalComponent } from "preact";
import cn from "classnames";
import { useState } from "preact/hooks";
import { Button } from "../button";

interface IPagination {
  productsCount: number;
  perPage: number;
}
export const Pagination: FunctionalComponent<IPagination> = ({
  productsCount,
  perPage,
}) => {
  const [loading, setLoading] = useState(false);
  const pages = Array.from(
    { length: Math.floor(productsCount / perPage) },
    (_, index) => index + 1
  );
  const handlePage = () => {
    setLoading(true);
    setPage(page + 1);
    setStatePage("after");

    setTimeout(() => {
      setLoading(false);
    }, 300);
    // if (p > page) {
    //   setPage(p);
    //   setStatePage("after");
    // } else if (p < page) {
    //   setPage(p);
    //   setStatePage("before");
    // }
  };
  return (
    <div className="pagination py-5 text-center">
      <Button onClick={handlePage} loading={loading} className="border p-3">
        View more
      </Button>
    </div>
  );
};
