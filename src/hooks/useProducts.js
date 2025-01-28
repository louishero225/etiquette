import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

export function useProducts(category = null, subCategory = null) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        let data

        if (subCategory) {
          data = await productService.getProductsBySubCategory(subCategory)
        } else if (category) {
          data = await productService.getProductsByCategory(category)
        } else {
          data = await productService.getAllProducts()
        }

        if (isMounted) {
          setProducts(data)
          setTotalCount(data.length)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erreur lors du chargement des produits:', err)
          setError(err.message)
          setProducts([])
          setTotalCount(0)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [category, subCategory])

  return {
    products,
    loading,
    error,
    totalCount,
    isEmpty: products.length === 0 && !loading,
    hasProducts: products.length > 0,
  }
}
