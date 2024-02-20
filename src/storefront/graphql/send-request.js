import * as queries from "./queries";

import Storefront from "..";
import { getCookie } from "../../helpers/get-cookie";
import { setCookie } from "../../helpers/set-cookie";

const storefront = Storefront.getInstance();

export const getCart = async () => {
  try {
    const cartToken = getCookie("cart");
    if (!cartToken) return null;
    const response = await storefront.request({
      query: queries.getCart,
      variables: {
        id: cartToken,
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
    if (cartToken) {
      const response = await storefront.request({
        query: queries.addToCart,
        variables: {
          cartId: cartToken,
          merchandiseId: productId,
          quantity: 1,
        },
      });
      return response.data;
    } else {
      const responseCart = await storefront.request({
        query: queries.cartCreate,
        variables: {
          input: {
            lines: [
              {
                merchandiseId: productId,
                quantity: 1,
              },
            ],
          },
        },
      });
      const dataCart = await responseCart.data;
      setCookie("cart", dataCart.cartCreate.cart.id);
      return {
        cartLinesAdd: dataCart.cartCreate,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};
export const removeFromCart = async (lineIds) => {
  try {
    const cartToken = getCookie("cart");
    if (!cartToken) return null;
    const response = await storefront.request({
      query: queries.removeFromCart,
      variables: {
        cartId: cartToken,
        lineIds: [lineIds],
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
export const updateCartItem = async (lineId, quantity) => {
  try {
    const cartToken = getCookie("cart");
    if (!cartToken) return null;
    const response = await storefront.request({
      query: queries.updateCartItem,
      variables: {
        cartId: cartToken,
        lineId,
        quantity,
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
