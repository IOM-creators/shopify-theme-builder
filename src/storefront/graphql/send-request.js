import * as queries from "./queries";

import Storefront from "..";
import { getCookie } from "../../helpers/get-cookie";

const storefront = Storefront.getInstance();

export const getCart = async () => {
  try {
    const cartToken = getCookie("cart");
    if (!cartToken) return null;
    const response = await storefront.request({
      query: queries.getCart,
      variables: {
        id: `gid://shopify/Cart/${cartToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const addToCart = async (productId) => {
  try {
    const cartToken = getCookie("cart");
    if (!cartToken) return null;
    const response = await storefront.request({
      query: queries.addToCart,
      variables: {
        cartId: `gid://shopify/Cart/${cartToken}`,
        merchandiseId: productId,
        quantity: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getCollection = async (
  handle,
  first = 10,
  filters = [],
  sortType = "COLLECTION_DEFAULT"
) => {
  try {
    const response = await storefront.request({
      query: queries.getCollection,
      variables: {
        handle,
        first,
        filters,
        sortType,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getCollectionPoroducts = async (
  handle,
  sortType = "COLLECTION_DEFAULT",
  filters = [],
  first = 10,
  statePage = "",
  cursor = ""
) => {
  console.log("statePage", statePage);
  const variables = {
    handle,
    first,
    sortType,
    filters,
  };

  try {
    if (statePage === "after") {
      variables.after = cursor;
      const response = await storefront.request({
        query: queries.getCollectionNextProducts,
        variables,
      });
      return response.data;
    } else if (statePage === "before") {
      variables.before = cursor;
      const response = await storefront.request({
        query: queries.getCollectionPrevProducts,
        variables,
      });
      return response.data;
    } else {
      const response = await storefront.request({
        query: queries.getCollection,
        variables,
      });
      return response.data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const updateCustomerTags = async (customerId) => {
  try {
    const response = await storefront.request({
      query: queries.updateCustomer,
      variables: {
        input: {
          id: `gid://shopify/Customer/${customerId}`,
          tags: ["helo my dear friend again"],
        },
      },
      admin: true,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
