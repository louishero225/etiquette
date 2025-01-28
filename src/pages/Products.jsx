import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import SelectableProductCard from '../components/SelectableProductCard';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();
  
  const { products, loading, error } = useProducts(selectedCategory, selectedSubCategory);

  const handleProductSelect = (product, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    }
  };

  const handlePrintClick = () => {
    if (selectedProducts.length > 0) {
      navigate('/print', { state: { selectedProducts } });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-600 font-semibold">Une erreur est survenue</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Produits</h1>
        <button
          onClick={handlePrintClick}
          disabled={selectedProducts.length === 0}
          className={`btn-primary ${
            selectedProducts.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Imprimer ({selectedProducts.length})
        </button>
      </div>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedCategory || ''}
          onChange={(e) => {
            setSelectedCategory(e.target.value || null);
            setSelectedSubCategory(null);
          }}
          className="form-select"
        >
          <option value="">Toutes les catégories</option>
          {Array.from(new Set(products.map(p => p.category))).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {selectedCategory && (
          <select
            value={selectedSubCategory || ''}
            onChange={(e) => setSelectedSubCategory(e.target.value || null)}
            className="form-select"
          >
            <option value="">Toutes les sous-catégories</option>
            {Array.from(
              new Set(
                products
                  .filter(p => p.category === selectedCategory)
                  .map(p => p.subCategory)
              )
            ).map(subCat => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        )}
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(product => (
          <SelectableProductCard
            key={product.id}
            product={product}
            onSelect={handleProductSelect}
            selected={selectedProducts.some(p => p.id === product.id)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun produit trouvé
        </div>
      )}
    </div>
  );
}
