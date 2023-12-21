import { h, FunctionalComponent } from "preact";
import cn from "classname";

interface ISortSelect {
  setSortType: any;
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
export const SortSelect: FunctionalComponent<ISortSelect> = ({
  setSortType,
  className,
}) => {
  const handleSelect = (e) => {
    setSortType(e.target.value);
  };
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
