import PropTypes from 'prop-types';
import { formatPrice } from '../utils/formatters';

export default function LabelGrosOnly({ product }) {
  return (
    <div className="price-label bg-yellow-300 flex flex-col justify-between border-[1px] border-black pb-12 ">
      {/* Libellé du produit en haut */}
      <div className="text-red-600 text-[16px] text-center font-bold leading-tight mb-2">
        {product.labelName}
      </div>

      {/* Section centrale avec CARTON / DETAIL */}
      <div className="flex justify-center items-center gap-4 pb-1">
        <div className="text-center flex-1">
          <div className="text-black text-md font-bold ">
            CARTON
          </div>
          <div className="text-[#cc0000] text-3xl font-bold tabular-nums">
            {formatPrice(product.priceBox)}
          </div>
        </div>

       
      </div>

      {/* Prix en gros détail */}
      <div className="text-black text-xs  font-medium text-start pb-1">
        Prix en gros détail :    <span className="text-red-600 italic font-bold ">{formatPrice(product.priceWholesale)}</span>
      </div>

      {/* Ligne du bas avec alcool et colisage */}
      <div className="flex justify-between items-end text-xl mb-2">
        <div className=" text-black font-bold">
          {product.alcoholContent !== '0.0%' ? product.alcoholContent : ''}
        </div>
        <div className="text-black font-bold ">
          {product.packaging} x {product.volume}
        </div>
      </div>
    </div>
   );
}

LabelGrosOnly.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    priceWholesale: PropTypes.number.isRequired,
    wholesaleDetails: PropTypes.string,
    barcode: PropTypes.string
  }).isRequired
};
