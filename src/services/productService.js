import { supabase } from '../lib/supabase'

export const productService = {
  async getAllProducts() {
    try {
      console.log('Début du chargement des produits');
      
      let allProducts = [];
      let page = 0;
      const pageSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data, error, count } = await supabase
          .from('products')
          .select('*', { count: 'exact' })
          .order('designation')
          .range(page * pageSize, (page + 1) * pageSize - 1);
        
        if (error) {
          console.error('Erreur Supabase:', error);
          throw error;
        }

        if (!data || data.length === 0) {
          hasMore = false;
          break;
        }

        allProducts = [...allProducts, ...data];
        console.log(`Page ${page + 1}: ${data.length} produits chargés. Total: ${allProducts.length}`);
        
        if (data.length < pageSize) {
          hasMore = false;
        }
        
        page++;
      }

      console.log('Total des produits chargés:', allProducts.length);
      
      if (allProducts.length === 0) {
        console.log('Aucun produit trouvé');
        return [];
      }

      const formattedData = allProducts.map(this.mapToLabelFormat);
      console.log('Premier produit formaté:', formattedData[0]);
      return formattedData;
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      throw error;
    }
  },

  async getProductsByCategory(category) {
    try {
      console.log('Chargement des produits pour la catégorie:', category);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('designation')
        .limit(100000);

      if (error) {
        console.error('Erreur lors du chargement des produits par catégorie:', error);
        throw error;
      }

      console.log(`${data?.length || 0} produits trouvés dans la catégorie ${category}`);
      return data?.map(this.mapToLabelFormat) || [];
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  async getProductsBySubCategory(subCategory) {
    try {
      console.log('Chargement des produits pour la sous-catégorie:', subCategory);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('subCategory', subCategory)
        .order('designation')
        .limit(100000);

      if (error) {
        console.error('Erreur lors du chargement des produits par sous-catégorie:', error);
        throw error;
      }

      console.log(`${data?.length || 0} produits trouvés dans la sous-catégorie ${subCategory}`);
      return data?.map(this.mapToLabelFormat) || [];
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Fonction utilitaire pour mapper les données vers le format attendu par les composants d'étiquettes
  mapToLabelFormat(product) {
    try {
      // Utiliser le code comme identifiant unique
      const uniqueId = product.code || product.designation?.replace(/\s+/g, '-').toLowerCase();
      
      // Formater le pourcentage d'alcool
      const formatAlcohol = (alcohol) => {
        if (!alcohol) return '0.0%';
        const value = parseFloat(alcohol);
        return isNaN(value) ? '0.0%' : `${value.toFixed(1)}%`;
      };

      const formattedProduct = {
        id: uniqueId,
        code: product.code || '',
        name: product.designation || '',
        labelName: product.labelName || product['libelle-etiquette'] || product.designation || '',
        packaging: parseInt(product.packaging || product.colisage) || 0,
        volume: product.volume || product.contenance || '',
        category: product.category || product.categorie || '',
        alcoholContent: formatAlcohol(product.alcoholContent || product['%alcool']),
        priceBox: parseFloat(product.priceBox || product['prix-carton']) || 0,
        priceRetail: parseFloat(product.priceRetail || product['prix-detail']) || 0,
        priceWholesale: parseFloat(product.priceWholesale || product['prix-unitaire']) || 0,
        reference: product.reference || '',
        barcode: product.barcode || '',
        wineType: product.wineType || product['type-vin'] || '',
        image: product.image || '',
        description: product.description || product['description-produits'] || '',
      };

      return formattedProduct;
    } catch (error) {
      console.error('Erreur lors du mapping du produit:', error);
      console.error('Produit problématique:', product);
      throw error;
    }
  }
}
