import PropTypes from 'prop-types';

export default function ClassicPriceLabel({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="price-label bg-[#ffff00] flex flex-col justify-between print:break-inside-avoid">
      {/* Libellé du produit en haut */}
      <div className="text-[#ff0000] text-base font-bold leading-tight">
        {product.labelName}
      </div>

      {/* Section centrale avec CARTON / DETAIL */}
      <div className="flex justify-center items-center gap-4">
        <div className="text-center flex-1 bg-black rounded-lg bg-opacity-10 space-y-0.5">
          <div className="text-black text-xl font-bold">CARTON</div>
          <div className="text-[#ff0000] text-2xl font-bold tabular-nums">
            {formatPrice(product.priceBox)}
          </div>
        </div>

        <div className="text-4xl font-thin">|</div>

        <div className="text-center flex-1 bg-black rounded-lg bg-opacity-10">
          <div className="text-black text-xl font-bold ">DETAIL</div>
          <div className="text-[#ff0000] text-2xl font-bold tabular-nums">
            {formatPrice(product.priceRetail)}
          </div>
        </div>
      </div>

      {/* Prix en gros détail */}
      <div className="text-black text-xs italic font-medium text-start">
        Prix en gros détail : <span className='text-[#ff0000]'>{Math.ceil((product.priceWholesale))}</span> 
      </div>

      {/* Ligne du bas avec alcool et colisage */}
      <div className="flex justify-between items-end text-base font-bold mt-4">
        <div className=" text-black px-2">
          {product.alcoholContent !== '0.0%' ? product.alcoholContent : ''}
        </div>
        <div className="text-black px-2">
          {product.packaging} x {product.volume}
        </div>
      </div>
    </div>
  );
}

ClassicPriceLabel.propTypes = {
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
