import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, PrinterIcon } from '@heroicons/react/24/outline';
import SelectableProductCard from '../components/SelectableProductCard';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';

export default function Labels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(new Map()); // Map de id -> {product, quantity}
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Charger les produits
  useEffect(() => {
    async function loadProducts() {
      try {
        console.log('Chargement des produits...');
        const data = await productService.getAllProducts();
        console.log('Produits chargés:', data.length);
        setProducts(data);
        
        // Extraire les catégories uniques
        const uniqueCategories = [...new Set(data.map(p => p.category))].filter(Boolean).sort();
        console.log('Catégories trouvées:', uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    console.log('Filtrage des produits:', {
      total: products.length,
      searchQuery,
      selectedCategory
    });
    
    return products.filter(product => {
      const matchesSearch = 
        (product.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (product.reference?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (product.labelName?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleProductSelect = (product, isSelected, quantity = 1) => {
    console.log('Sélection du produit:', {
      product: product.id,
      isSelected,
      quantity
    });
    
    setSelectedProducts(prev => {
      const newMap = new Map(prev);
      if (isSelected) {
        newMap.set(product.id, { product, quantity });
      } else {
        newMap.delete(product.id);
      }
      return newMap;
    });
  };

  const handlePrintClick = () => {
    if (selectedProducts.size > 0) {
      // Convertir la Map en tableau avec les quantités
      const productsArray = Array.from(selectedProducts.values()).flatMap(({ product, quantity }) =>
        Array(quantity).fill(product)
      );
      
      console.log('Navigation vers impression avec:', productsArray.length, 'étiquettes');
      navigate('/print', { 
        state: { 
          selectedProducts: productsArray
        } 
      });
    }
  };

  // Calculer le nombre total d'étiquettes
  const totalLabels = Array.from(selectedProducts.values()).reduce(
    (sum, { quantity }) => sum + quantity,
    0
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Erreur lors du chargement des produits</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Impression d'étiquettes</h1>
        <button
          onClick={handlePrintClick}
          disabled={selectedProducts.size === 0}
          className={`flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <PrinterIcon className="h-5 w-5" />
          <span>Imprimer ({totalLabels} étiquette{totalLabels > 1 ? 's' : ''})</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Barre de recherche */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Filtre par catégorie */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none w-full sm:w-48 px-4 py-2 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Résumé des résultats */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          {selectedCategory && ` dans la catégorie ${selectedCategory}`}
          {searchQuery && ` pour la recherche "${searchQuery}"`}
        </p>
      </div>

      {/* Grille de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <SelectableProductCard
            key={product.id}
            product={product}
            onSelect={handleProductSelect}
            selected={selectedProducts.has(product.id)}
          />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {products.length === 0 
              ? 'Aucun produit disponible'
              : 'Aucun produit ne correspond à votre recherche'
            }
          </p>
        </div>
      )}
    </div>
  );
}
