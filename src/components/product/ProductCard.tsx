import { h, FunctionalComponent } from "preact";

interface IProductCard {
  product: any;
}
export const ProductCard: FunctionalComponent<IProductCard> = ({ product }) => {
  console.log("product", product);
  return (
    <div class="product-card p-4 bg-gray-light">
      {product.featuredImage && (
        <div className="product-card__image img-wrapper">
          <img src={product.featuredImage.src} alt="" />
        </div>
      )}
      <div className="product-card__info mt-4">
        {product.title && (
          <a
            href={`/products/${product.handle}`}
            className="info__title text-xl"
          >
            {product.title}
          </a>
        )}
        {product.description && (
          <p className="info__description text-base">{product.description}</p>
        )}
        {product.priceRange && (
          <span className="info__price flex">
            <span className="info__min-price">
              {product.priceRange.minVariantPrice.amount +
                product.priceRange.minVariantPrice.currencyCode}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
