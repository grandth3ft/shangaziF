import { useState, useEffect, useCallback } from 'react'
import { getDonations } from '@/api/admin'

/**
 * Fetches and manages paginated admin donations list.
 * Supports all backend filter params.
 */
export function useAdminDonations(initialFilters = {}) {
  const [donations, setDonations] = useState([])
  const [pagination, setPagination] = useState(null)
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 20,
    ...initialFilters,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDonations = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getDonations(filters)
      setDonations(result.donations)
      setPagination(result.pagination)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1, // Reset to page 1 on filter change
    }))
  }, [])

  const goToPage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  return {
    donations,
    pagination,
    filters,
    isLoading,
    error,
    updateFilters,
    goToPage,
    refetch: fetchDonations,
  }
}
