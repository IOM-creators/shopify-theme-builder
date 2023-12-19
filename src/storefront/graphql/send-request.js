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

export const getCollection = async (handle) => {
  try {
    const response = await storefront.request({
      query: queries.getCollection,
      variables: {
        handle,
      },
    });
    return response.data;
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
