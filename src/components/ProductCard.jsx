import PropTypes from 'prop-types';
import { BeakerIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function ProductCard({ product }) {
  // Formater le prix sans symbole monétaire
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* En-tête avec nom et catégorie */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900">{product.labelName}</h3>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
          {product.category}
        </span>
      </div>

      {/* Informations sur le colisage et le volume */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <CubeIcon className="h-4 w-4 mr-1" />
          <span>{product.packaging} unités</span>
        </div>
        <div className="flex items-center">
          <BeakerIcon className="h-4 w-4 mr-1" />
          <span>{product.volume}</span>
        </div>
        {product.alcoholContent !== '0.0%' && (
          <span className="text-primary">{product.alcoholContent}</span>
        )}
      </div>

      {/* Prix */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
          <span className="text-gray-600">Prix carton</span>
          <span className="text-xl font-bold text-primary">{formatPrice(product.priceBox)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Prix détail</span>
          <span className="text-base font-medium text-gray-700">{formatPrice(product.priceRetail)}</span>
        </div>
      </div>

      {/* Référence */}
      <div className="text-sm text-gray-400">
        Réf: {product.reference}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
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
};
