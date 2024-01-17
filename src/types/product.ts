export type ProductTypes = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: {
    src: string;
    altText: string;
  };
  priceRange: {
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  variants: {
    nodes: {
      id: string;
      compareAtPrice: {
        amount: number;
      };
      price: {
        amount: number;
      };
    };
  };
};
