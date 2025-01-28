import PropTypes from 'prop-types';

export default function PriceLabel({ product }) {
  // Formater le prix sans symbole monétaire
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="w-[280px] h-[180px] bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 flex flex-col justify-between rounded-lg shadow-sm print:shadow-none">
      {/* Libellé du produit en haut */}
      <div className="text-gray-800 text-xl font-bold leading-tight truncate">
        {product.labelName}
      </div>

      {/* Section centrale avec CARTON / BOUTEILLE */}
      <div className="flex justify-center items-center gap-4 my-1">
        <div className="text-center flex-1">
          <div className="text-gray-700 text-sm font-medium tracking-wide mb-1">
            CARTON
          </div>
          <div className="text-[#cc0000] text-3xl font-bold tabular-nums">
            {formatPrice(product.priceBox)}
          </div>
        </div>

        <div className="h-12 w-[1px] bg-gray-400/30"></div>

        <div className="text-center flex-1">
          <div className="text-gray-700 text-sm font-medium tracking-wide mb-1">
            BOUTEILLE
          </div>
          <div className="text-[#cc0000] text-3xl font-bold tabular-nums">
            {formatPrice(product.priceRetail)}
          </div>
        </div>
      </div>

      {/* Ligne du bas avec alcool et colisage */}
      <div className="flex justify-between items-end pt-2 border-t border-gray-600/10">
        <div className="text-lg font-semibold text-gray-800">
          {product.alcoholContent !== '0.0%' ? product.alcoholContent : ''}
        </div>
        <div className="text-lg text-gray-700 font-medium">
          {product.packaging} × {product.volume}
        </div>
      </div>
    </div>
  );
}

PriceLabel.propTypes = {
  product: PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    priceBox: PropTypes.number.isRequired,
    priceRetail: PropTypes.number.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    packaging: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
  }).isRequired,
};
