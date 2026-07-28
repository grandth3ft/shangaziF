import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// ── Public client (no auth) ────────────────────────────────────────────────
export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ── Private client (JWT auth) ──────────────────────────────────────────────
export const privateClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Track if we're currently refreshing to avoid infinite loops
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Token getter — injected by authStore after it initialises to avoid circular deps
let _getAccessToken = () => null
let _getRefreshToken = () => null

export function setTokenGetters(getAccess, getRefresh) {
  _getAccessToken = getAccess
  _getRefreshToken = getRefresh
}

// ── Request interceptor: attach Bearer token ──────────────────────────────
privateClient.interceptors.request.use(
  (config) => {
    const token = _getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: silent token refresh on 401 ─────────────────────
privateClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return privateClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { useAuthStore } = await import('@/store/authStore')
        const store = useAuthStore.getState()
        const newToken = await store.refreshAccessToken()
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return privateClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        const { useAuthStore } = await import('@/store/authStore')
        await useAuthStore.getState().logout()
        window.location.href = '/admin/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// ── Helpers ───────────────────────────────────────────────────────────────
/**
 * Extract error message from API response.
 * Backend returns: { success: false, error: string, code: string }
 */
export function getApiError(error) {
  // Backend envelope: { success: false, error: { code, message } }
  if (error.response?.data?.error?.message) {
    return error.response.data.error.message
  }
  // Fallback for flat error strings
  if (typeof error.response?.data?.error === 'string') {
    return error.response.data.error
  }
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.'
  }
  if (!error.response) {
    return 'Network error. Please check your connection.'
  }
  return 'An unexpected error occurred. Please try again.'
}

export default publicClient
