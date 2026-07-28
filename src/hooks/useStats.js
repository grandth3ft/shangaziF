import { useState, useEffect } from 'react'
import { getStats } from '@/api/admin'

/**
 * Fetches admin dashboard statistics.
 * Returns stats, loading, and error state.
 */
export function useStats() {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getStats()
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, isLoading, error }
}
