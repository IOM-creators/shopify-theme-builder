export const productVariant = `
    id
    title
    price{
        amount
        currencyCode
    }
    image{
        src
        altText
    }
    product {
        title
        handle
    }
`;

export const product = `
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
`;
export const customer = `
    id
`;
