import { h, FunctionalComponent } from "preact";
import { Image } from "../image";
import { setPopupState } from "../../state";
import { Button } from "../button";
import { useState } from "preact/hooks";
import cn from "classnames";
import { addToCart } from "../../storefront/graphql/send-request";

interface IProductCard {
  product: any;
  isAddBtn?: boolean;
  isDescription?: boolean;
}
export const ProductCard: FunctionalComponent<IProductCard> = ({
  product,
  isAddBtn,
  isDescription,
}) => {
  const [isAdded, setAdded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePopup = async (id) => {
    setLoading(true);
    const res = await addToCart(id);
    if (res.cartLinesAdd.userErrors.length) {
      setLoading(false);
      setErrorMessage(res.cartLinesAdd.userErrors[0].message);
    } else {
      setLoading(false);
      setAdded(true);
    }
    console.log("isAdded", isAdded);
    // setPopupState({
    //   state: true,
    //   content: <div>Popup content</div>,
    //   title,
    // });
  };

  return (
    <div className="product-card">
      {product.featuredImage && (
        <div className="product-card__image relative">
          <Image image={product.featuredImage} className="before:pt-[150%]" />
          {isAddBtn && (
            <Button
              className={cn(
                {
                  "bg-white": isAdded,
                  "bg-black": !isAdded,
                },
                "absolute bottom-4 right-4 p-2 rounded-full border add-to-cart"
              )}
              onClick={() => handlePopup(product.variants.nodes[0].id)}
              icon={isAdded ? "added-to-cart" : "add-to-cart"}
              classIcon={isAdded ? "fill-black" : "fill-white"}
              onlyIcon
              loading={isLoading}
            />
          )}
        </div>
      )}
      {errorMessage && (
        <span className="text-error block mt-2">{errorMessage}</span>
      )}
      <div className="product-card__info mt-4">
        {product.title && (
          <a
            href={`/products/${product.handle}`}
            className="info__title text-xl mb-2"
          >
            {product.title}
          </a>
        )}
        {product.description && isDescription && (
          <p className="info__description text-base text-two-lines mb-2 text-gray">
            {product.description}
          </p>
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
