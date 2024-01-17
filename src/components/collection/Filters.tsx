import { h, FunctionalComponent, Fragment } from "preact";
import { Button } from "../button";
import { Icon } from "../icon";
import { useEffect, useState } from "preact/hooks";
import cn from "classnames";
import { setFiltersState } from "../../state/collection";
interface IFilters {
  filters: any[];
}
export const Filters: FunctionalComponent<IFilters> = ({ filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtersData, setFiltersData] = useState<any>([]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const removeElementFromArray = (arr, object) => {
    const indexToRemove = arr.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(object)
    );
    indexToRemove !== -1 && arr.splice(indexToRemove, 1);
    return arr;
  };
  const handleDataFilters = (e) => {
    const filter = JSON.parse(e.target.dataset.typeFilter);
    if (e.target.checked) {
      setFiltersData([...filtersData, filter]);
    } else {
      setFiltersData([...removeElementFromArray(filtersData, filter)]);
    }
  };
  useEffect(() => {
    setFiltersState(filtersData);
  }, [filtersData]);

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
          "filters__wrapper max-w-sm fixed top-0 left-0 z-10 w-128 h-full bg-white shadow-bottom transition-transform overflow-y-auto"
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
        <div className="filter__container px-5 pb-5">
          <form id="filtersData" onChange={handleDataFilters}>
            {filters.map((filter) =>
              filter.type === "LIST" ? (
                <div className="form-group grid grid-cols-2 gap-x-2 mb-8">
                  <h4 className="form-group__title text-xl col-span-2 mb-4">
                    {filter.label}
                  </h4>
                  {filter.values.map((value) => (
                    <div
                      className={cn(
                        {
                          "text-disabled ": value.count === 0,
                        },
                        "form-element my-2"
                      )}
                    >
                      <input
                        id={value.label}
                        type="checkbox"
                        name={value.label}
                        data-type-filter={value.input}
                        value={value.label.toLowerCase()}
                        className="p-2 mr-2"
                      />
                      <label htmlFor={value.label}>
                        {value.label}
                        <span className="text-silver text-sm">
                          {" "}
                          ({value.count})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
//appearance-none
