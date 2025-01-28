import PropTypes from 'prop-types';

export default function ModernPriceLabel({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="price-label bg-gradient-to-br from-yellow-300 to-yellow-400 flex flex-col justify-between">
      {/* Libellé du produit en haut */}
      <div className="text-gray-800 text-base font-bold leading-tight">
        {product.labelName}
      </div>

      {/* Section centrale avec CARTON / DETAIL */}
      <div className="flex justify-center items-center gap-4">
        <div className="text-center flex-1">
          <div className="text-gray-700 text-sm font-bold mb-1">
            CARTON
          </div>
          <div className="text-[#cc0000] text-xl font-bold tabular-nums">
            {formatPrice(product.priceBox)}
          </div>
        </div>

        <div className="h-10 w-[1px] bg-gray-400/30"></div>

        <div className="text-center flex-1">
          <div className="text-gray-700 text-sm font-bold mb-1">
            DETAIL
          </div>
          <div className="text-[#cc0000] text-xl font-bold tabular-nums">
            {formatPrice(product.priceRetail)}
          </div>
        </div>
      </div>

      {/* Prix en gros détail */}
      <div className="text-gray-800 text-xs font-medium text-start">
        Prix en gros détail : {formatPrice(product.priceWholesale)}
      </div>

      {/* Ligne du bas avec alcool et colisage */}
      <div className="flex justify-between items-end text-base">
        <div className="font-semibold text-gray-800">
          {product.alcoholContent !== '0.0%' ? product.alcoholContent : ''}
        </div>
        <div className="text-gray-700 font-medium">
          {product.packaging} x {product.volume}
        </div>
      </div>
    </div>
  );
}

ModernPriceLabel.propTypes = {
  product: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    priceBox: PropTypes.number.isRequired,
    priceRetail: PropTypes.number.isRequired,
    priceWholesale: PropTypes.number.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    packaging: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
  }).isRequired,
};
