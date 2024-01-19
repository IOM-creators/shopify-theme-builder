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
      totalQuantity
      lines(first: 10) {
        nodes {
          quantity
          ... on CartLine {
            id
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                ${fragments.productVariant}
              }
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
      totalQuantity
      lines(first: 10) {
        nodes {
          quantity
          ... on CartLine {
            id
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                ${fragments.productVariant}
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;
export const removeFromCart = `
mutation removeFromCart ($cartId: ID!, $lineIds: [ID!]!){
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      totalQuantity
      lines(first: 10) {
        nodes {
          quantity
          ... on CartLine {
            id
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                ${fragments.productVariant}
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;
export const updateCartItem = `
mutation cartLinesUpdate ($cartId: ID!, $lineId: ID!, $quantity: Int!){
  cartLinesUpdate(cartId: $cartId, lines: {id: $lineId, quantity: $quantity} ) {
    cart {
      totalQuantity
      lines(first: 10) {
        nodes {
          quantity
          ... on CartLine {
            id
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                ${fragments.productVariant}
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const getCollection = `
query getCollection($handle: String!, $first: Int!, $filters: [ProductFilter!], $sortType: ProductCollectionSortKeys) {
  collection(handle: $handle) {
      title
      description
      image {
        src
        altText
      }
      products(first: $first, sortKey: $sortType, filters: $filters) {
        filters {
          label
          type
          values {
            count
            input
            label
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          ${fragments.product}
        }
      }
     
    }
  }
`;
