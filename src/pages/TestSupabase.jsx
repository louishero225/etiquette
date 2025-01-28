import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TestSupabase() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products...');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Products received:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Test Supabase Connection</h1>
        <div>Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Test Supabase Connection</h1>
        <div className="text-red-600">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Supabase Connection</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">État de la connexion</h2>
        <div className="text-green-600">✓ Connecté à Supabase</div>
        <div className="text-gray-600">Nombre de produits récupérés: {products.length}</div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Exemple de données (5 premiers produits)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Code</th>
                <th className="border p-2">Désignation</th>
                <th className="border p-2">Prix Carton</th>
                <th className="border p-2">Prix Détail</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.code || product.id} className="hover:bg-gray-50">
                  <td className="border p-2">{product.code}</td>
                  <td className="border p-2">{product.designation}</td>
                  <td className="border p-2">{product['prix-carton'] || product.priceBox}</td>
                  <td className="border p-2">{product['prix-detail'] || product.priceRetail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Structure des données</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify(products[0], null, 2)}
        </pre>
      </div>
    </div>
  );
}
