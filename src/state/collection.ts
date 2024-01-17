import { h } from "preact";
import { ProductTypes } from "../types/product";

interface ICollectionState {
  collection: {
    title: string;
    description: string;
    image: {
      src: string;
      altText: string;
    };
    products: {
      filters: {
        label: string;
        type: string;
        values: {
          count: number;
          input: string;
          label: string;
        };
      };
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
      };
      nodes: ProductTypes;
    };
  };
}

let collectionState: ICollectionState | null = null;
let collectionStateCallback: any = null;

export const getCollectionState = () => collectionState;

export const setCollectionState = (value) => {
  collectionState = value;
  if (collectionStateCallback) {
    collectionStateCallback(value);
  }
};

export const subscribeToCollectionState = (callback) => {
  collectionStateCallback = callback;
};

let filtersState: any[] = [];
let filtersStateCallback: any = null;

export const getFiltersState = () => filtersState;

export const setFiltersState = (value) => {
  filtersState = value;
  if (filtersStateCallback) {
    filtersStateCallback(value);
  }
};

export const subscribeToFiltersState = (callback) => {
  filtersStateCallback = callback;
};

let sortState: string = "TITLE";
let sortStateCallback: any = null;

export const getSortState = () => sortState;

export const setSortState = (value) => {
  sortState = value;
  if (sortStateCallback) {
    sortStateCallback(value);
  }
};

export const subscribeToSortState = (callback) => {
  sortStateCallback = callback;
};

let paginationState: number = 1;
let paginationStateCallback: any = null;

export const getPaginationState = () => paginationState;

export const setPaginationState = (value) => {
  paginationState = value;
  if (paginationStateCallback) {
    paginationStateCallback(value);
  }
};

export const subscribeToPaginationState = (callback) => {
  paginationStateCallback = callback;
};
