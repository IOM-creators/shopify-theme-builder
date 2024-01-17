import { h, FunctionalComponent } from "preact";
import cn from "classnames";
import { useEffect, useState } from "preact/hooks";
import { setSortState } from "../../state/collection";

interface ISortSelect {
  className?: string;
}
const sortTypes = [
  "TITLE",
  "PRICE",
  "BEST_SELLING",
  "CREATED",
  "MANUAL",
  "COLLECTION_DEFAULT",
  "RELEVANCE",
];
export const SortSelect: FunctionalComponent<ISortSelect> = ({ className }) => {
  const [sortData, setSortData] = useState<string>("TITLE");

  const handleSelect = (e) => {
    setSortData(e.target.value);
  };

  useEffect(() => {
    setSortState(sortData);
  }, [sortData]);

  return (
    <div className={cn(className, {}, "collection__sort-select")}>
      <select name="sortType" id="sortType" onChange={handleSelect}>
        {sortTypes.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};
