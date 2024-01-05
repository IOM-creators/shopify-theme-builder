import { h, FunctionalComponent } from "preact";
import { Button } from "../button";
import { Icon } from "../icon";
import { useState } from "preact/hooks";
import cn from "classnames";

interface IFilters {
  setMaxPrice: any;
  setMinPrice: any;
}
const filters = [];
export const Filters: FunctionalComponent<IFilters> = ({
  setMaxPrice,
  setMinPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(+e.target.value);
  };

  const handleMinPrice = (e) => {
    setMinPrice(+e.target.value);
  };
  return (
    <div className="collection__filters">
      <Button className="flex" onClick={handleOpen}>
        <Icon icon="filter" className="mr-2" />
        Filters
      </Button>
      <div
        className={cn(
          {
            "opacity-1 visible translate-x-[0]": isOpen,
            "opacity-0 invisible translate-x-[-100%]": !isOpen,
          },
          "filters__wrapper fixed top-0 left-0 z-10 w-128 h-full bg-white shadow-bottom transition-transform"
        )}
      >
        <div className="filters__header py-10 px-5 text-center relative">
          <h2 className="text-3xl">Filters</h2>
          <Button
            icon="close"
            onlyIcon
            className="absolute right-5 top-5"
            onClick={handleOpen}
          />
        </div>
        <div className="filter__container px-5 pb-10">
          <form id="dataPrice">
            <div className="form-group grid grid-cols-2 gap-x-2">
              <h3 className="form-group__title text-2xl col-span-2 mb-4">
                Price
              </h3>
              <div className="form-element v">
                <label htmlFor="minPrice"></label>
                <input
                  type="number"
                  id="minPrice"
                  name="min"
                  placeholder="Min"
                  className="w-full border p-2 appearance-none"
                  onChange={handleMinPrice}
                />
              </div>
              <div className="form-element ">
                <label htmlFor="maxPrice"></label>
                <input
                  type="number"
                  id="maxPrice"
                  name="max"
                  placeholder="Max"
                  className="w-full border p-2 appearance-none"
                  onChange={handleMaxPrice}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
