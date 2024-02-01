import { h, FunctionalComponent, Fragment } from "preact";
import { Button } from "../button";
import { Icon } from "../icon";
import { useEffect, useRef, useState } from "preact/hooks";
import cn from "classnames";
import { setFiltersState, setPaginationState } from "../../state/collection";
import { AccordionItem } from "../accordion/Accordion";
interface IFilters {
  filters: any[];
}
export const Filters: FunctionalComponent<IFilters> = ({ filters }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filtersData, setFiltersData] = useState<any>([]);

  const handleFilters = () => {
    setIsOpen(!isOpen);
  };
  const handleClearFilters = () => {
    setFiltersData([]);
    if (inputRefs.current) {
      inputRefs.current.forEach((el: any) => (el.checked = false));
    }
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
    setPaginationState(1);
    setFiltersState(filtersData);
  }, [filtersData]);

  return (
    <div className="collection__filters">
      <div
        className={cn(
          { "invisible opacity-0 transition-all": !isOpen },
          "collection__filters-overlay fixed top-0 left-0 z-10 w-full h-full bg-black-05"
        )}
        onClick={handleFilters}
      ></div>
      <Button className="flex" onClick={handleFilters}>
        <Icon icon="filter" className="mr-2" />
        Filters
      </Button>
      <div
        className={cn(
          {
            "opacity-1 visible translate-x-[0]": isOpen,
            "opacity-0 invisible translate-x-[100%]": !isOpen,
          },
          "filters__wrapper max-w-sm fixed top-0 right-0 z-10 w-full h-full bg-white shadow-bottom transition-transform"
        )}
      >
        <div className="filters__header py-10 px-5 text-center relative">
          <h2 className="text-3xl">Filters</h2>
          <Button
            icon="close"
            onlyIcon
            className="absolute right-5 top-5"
            onClick={handleFilters}
          />
        </div>
        <div className="h-filter-container filter__container px-5 pb-5 overflow-y-auto">
          <form id="filtersData" onChange={handleDataFilters}>
            {filters.map((filter) =>
              filter.type === "LIST" ? (
                <AccordionItem
                  classContent="form-group grid grid-cols-2 gap-x-2"
                  title={filter.label}
                  classTitle="form-group__title text-xl col-span-2 mb-4"
                >
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
                        ref={(el) =>
                          inputRefs.current.length !==
                          filters.reduce((c, a) => c + a.values.length, 0)
                            ? inputRefs.current.push(el)
                            : []
                        }
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
                </AccordionItem>
              ) : (
                <Fragment></Fragment>
              )
            )}
          </form>
        </div>
        <div className="filter__footer absolute bottom-0 left-0 w-full bg-white ">
          <Button
            className="p-5 underline text-xl w-1/2"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
          <Button
            className="p-5 text-xl underline w-1/2"
            onClick={handleFilters}
          >
            Applay
          </Button>
        </div>
      </div>
    </div>
  );
};
//appearance-none
