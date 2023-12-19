import { h, FunctionalComponent } from "preact";

interface IProductCard {
  product: any;
}
export const ProductCard: FunctionalComponent<IProductCard> = ({ product }) => {
  console.log("product", product);
  return (
    <div class="product-card">
      <div className="product-card__image img-wrapper">
        <img src={product.featuredImage.src} alt="" />
      </div>
      <div className="product-card__info">
        <h3 className="info__title text-xl">{product.title}</h3>
        <p className="info__description text-base">{product.description}</p>
        <span className="info__price flex">
          <span className="info__min-price">
            {product.priceRange.minVariantPrice.amount +
              product.priceRange.minVariantPrice.currencyCode}
          </span>
          /
          <span className="info__max-price">
            {product.priceRange.maxVariantPrice.amount +
              product.priceRange.minVariantPrice.currencyCode}
          </span>
        </span>
      </div>
    </div>
  );
};
