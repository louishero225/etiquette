import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default function SelectableProductCard({ product, selected, onSelect }) {
  const handleQuantityChange = (e) => {
    e.stopPropagation();
    const quantity = parseInt(e.target.value) || 1;
    onSelect(product, true, quantity);
  };

  return (
    <div 
      className={`relative cursor-pointer transition-all ${
        selected ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-lg'
      }`}
      onClick={() => onSelect(product, !selected, 1)}
    >
      <ProductCard product={product} />
      
      {/* Indicateur de sélection */}
      <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected 
          ? 'bg-primary border-primary' 
          : 'bg-white border-gray-300'
      }`}>
        {selected && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Sélecteur de quantité (visible si sélectionné) */}
      {selected && (
        <div className="absolute left-0 right-0 bottom-0 p-4 bg-white border-t">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              Nombre d'étiquettes :
            </label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              onClick={(e) => e.stopPropagation()}
              onChange={handleQuantityChange}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-right"
            />
          </div>
        </div>
      )}
    </div>
  );
}

SelectableProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    labelName: PropTypes.string.isRequired,
    packaging: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholContent: PropTypes.string.isRequired,
    priceBox: PropTypes.number.isRequired,
    priceRetail: PropTypes.number.isRequired,
    priceWholesale: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
