/**
 * Formate un prix en format français (avec espace comme séparateur de milliers)
 * @param {number} price - Le prix à formater
 * @returns {string} Le prix formaté
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price);
};
