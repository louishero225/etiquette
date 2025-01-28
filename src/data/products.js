export const existingProducts = [
  {
    id: '10001',
    name: 'CODYS BIERE 33CL X 24',
    labelName: 'CODYS 33CL',
    packaging: 24,
    volume: '33cl',
    category: 'Bières',
    alcoholContent: '4.7%',
    priceBox: 1850,
    priceRetail: 95,
    priceWholesale: 77,
    reference: 'COD33',
    unitPrice: 77,
  },
  {
    id: '10002',
    name: 'HEINEKEN 33CL X 24',
    labelName: 'HEINEKEN 33CL',
    packaging: 24,
    volume: '33cl',
    category: 'Bières',
    alcoholContent: '5.0%',
    priceBox: 2350,
    priceRetail: 120,
    priceWholesale: 98,
    reference: 'HEI33',
    unitPrice: 98,
  },
  {
    id: '10003',
    name: 'CASTEL 33CL X 24',
    labelName: 'CASTEL 33CL',
    packaging: 24,
    volume: '33cl',
    category: 'Bières',
    alcoholContent: '5.2%',
    priceBox: 2150,
    priceRetail: 110,
    priceWholesale: 90,
    reference: 'CAS33',
    unitPrice: 90,
  },
  {
    id: '70041',
    name: 'TERMIDOR ROUGE 1L X 12',
    labelName: 'TERMIDOR ROUGE',
    packaging: 12,
    volume: '1 l',
    category: 'VIN BRIQUE',
    subCategory: 'Non prog.(0)',
    alcoholContent: '12.5%',
    priceBox: 10000,
    priceRetail: 1000,
    supplier: 'Cave & Gardens-Ghana',
    reference: '70041',
    unitPrice: 833.33,
  },
  {
    id: '60735',
    name: 'B53 LES ARMES D\'OC SYRAH 750ML X 6',
    labelName: 'B53 LES ARMES D\'OC SYRAH',
    packaging: 6,
    volume: '750 ml',
    category: 'VIN BOUCHET',
    subCategory: 'Non prog.(0)',
    alcoholContent: '0.0%',
    priceBox: 14400,
    priceRetail: 2900,
    supplier: 'CPESO',
    reference: '60735',
    wineType: 'VIN ROUGE',
    unitPrice: 2400,
  },
  {
    id: '30057',
    name: 'SPRITE CANETTE 33CL X 24',
    labelName: 'SPRITE CANETTE',
    packaging: 24,
    volume: '33 cl',
    category: 'S/ALCOOL',
    subCategory: 'Non prog.(0)',
    alcoholContent: '0.0%',
    priceBox: 7800,
    priceRetail: 400,
    supplier: 'SDTM',
    reference: '30057',
    unitPrice: 325,
  },
  {
    id: '60751',
    name: 'B57 LES CINQ PATTES 2019 BORDEAUX 750ML X 6',
    labelName: 'B57 LES CINQ PATTES 2019 BORDEAUX',
    packaging: 6,
    volume: '750 ml',
    category: 'VIN BOUCHET',
    subCategory: 'Non prog.(0)',
    alcoholContent: '13.5%',
    priceBox: 18600,
    priceRetail: 3700,
    supplier: 'CPESO',
    reference: '60751',
    wineType: 'VIN ROUGE',
    unitPrice: 3100,
  },
  // Ajout des autres produits...
];

// Cas de test extrêmes pour la mise en page des étiquettes
const testProducts = [
  {
    id: 'test1',
    name: 'Très Long Nom De Produit Qui Dépasse Largement La Normale Pour Tester Les Limites',
    labelName: 'Très Long Nom De Produit Qui Dépasse Largement La Normale Pour Tester Les Limites',
    packaging: 999,
    volume: '1500ml',
    category: 'Test',
    alcoholContent: '99.9%',
    priceBox: 999999,
    priceRetail: 99999,
    priceWholesale: 89999,
    reference: 'TEST-LONG-REF-999',
    unitPrice: 89999,
  },
  {
    id: 'test2',
    name: 'Prix Élevés',
    labelName: 'CHÂTEAU TRÈS PRESTIGIEUX MILLÉSIME EXCEPTIONNEL',
    packaging: 12,
    volume: '750ml',
    category: 'Test',
    alcoholContent: '14.5%',
    priceBox: 9999999,
    priceRetail: 999999,
    priceWholesale: 899999,
    reference: 'TEST-PRIX-999',
    unitPrice: 899999,
  },
  {
    id: 'test3',
    name: 'Gros Volume',
    labelName: 'MATHUSALEM PRESTIGE',
    packaging: 99,
    volume: '6000ml',
    category: 'Test',
    alcoholContent: '40.0%',
    priceBox: 12500,
    priceRetail: 1250,
    priceWholesale: 1150,
    reference: 'TEST-VOL-999',
    unitPrice: 1150,
  }
];

// Ajouter les cas de test au début du tableau de produits
export const products = [...testProducts, ...existingProducts];

// Fonction pour obtenir tous les produits
export const getProducts = () => products;

// Fonction pour obtenir un produit par son ID
export const getProductById = (id) => products.find(product => product.id === id);

// Fonction pour rechercher des produits
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.reference.toLowerCase().includes(searchTerm) ||
    product.labelName.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

// Fonction pour obtenir les produits par catégorie
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Obtenir toutes les catégories uniques
export const getCategories = () => {
  return [...new Set(products.map(product => product.category))];
};

// Fonction pour formater le prix
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(price);
};
