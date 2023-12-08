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
