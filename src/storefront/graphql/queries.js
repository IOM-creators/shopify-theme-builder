import * as fragments from "./fragments";

export const updateCustomer = `
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        ${fragments.customer}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const cartCreate = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const getCart = `
  query getCart($id: ID!) {
    cart(id: $id) {
      lines(first: 10) {
        nodes {
          quantity
          merchandise {
            ... on ProductVariant {
              ${fragments.productVariant}
            }
          }
        }
      }
    }
  }
`;
export const addToCart = `
mutation addToCart ($cartId: ID!, $merchandiseId: ID!, $quantity: Int!){
  cartLinesAdd(cartId: $cartId, lines: {merchandiseId: $merchandiseId, quantity: $quantity}) {
    cart {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const getCollection = `
  query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        description
        image {
          src
          altText
        }
        products(first: 10) {
          nodes {
              id
              title
              handle
              description
              featuredImage {
                src
                altText
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 1) {
                nodes {
                  id
                  compareAtPrice {
                    amount
                  }
                  price {
                    amount
                  }
                }
              }
          }
        }
      }
  }
`;
