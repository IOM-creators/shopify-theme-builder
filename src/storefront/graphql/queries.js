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
export const getCollectionNextProducts = `
query getCollectionNexProducts($handle: String!, $first: Int!, $filters: [ProductFilter!], $sortType: ProductCollectionSortKeys, $after: String!) {
  collection(handle: $handle) {
      title
      description
      image {
        src
        altText
      }
      products(first: $first, after: $after, sortKey: $sortType, filters: $filters) {
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
export const getCollectionPrevProducts = `
query getCollectionPrevProducts($handle: String!, $first: Int!, $filters: [ProductFilter!], $sortType: ProductCollectionSortKeys, $before: String!) {
  collection(handle: $handle) {
      title
      description
      image {
        src
        altText
      }
      products(last: $first, before: $before, sortKey: $sortType, filters: $filters) {
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

/*variables for collection filters 
{
  tag: "test",
},
{ productType: "" },
{ productVendor: "" },
{
  productMetafield: {
    namespace: "",
    key: "",
    value: "",
  },
},
{
  variantOption: {
    name: "",
    value: "",
  },
},
{
  price: {
    min: 40,
    max: 35,
  },
},
*/
