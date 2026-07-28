import { create } from 'zustand'
import { loginAdmin, logoutAdmin, refreshToken, getProfile } from '@/api/auth'
import { setTokenGetters } from '@/api/client'

const REFRESH_TOKEN_KEY = 'shangazi_refresh_token'

export const useAuthStore = create((set, get) => ({
  // ── State ────────────────────────────────────────────────────────────────
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // true on init until we check storage

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Called on app boot. Tries to restore session from localStorage.
   */
  initializeFromStorage: async () => {
    const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!storedRefreshToken) {
      set({ isLoading: false })
      return
    }

    try {
      const data = await refreshToken(storedRefreshToken)
      // Set the access token first so getProfile interceptor has it available
      set({
        accessToken: data.access_token,
        refreshToken: storedRefreshToken,
        isAuthenticated: true,
      })
      // Rehydrate user object so admin name/role/avatar are available immediately
      try {
        const profile = await getProfile()
        set({ user: profile, isLoading: false })
      } catch {
        // Profile fetch failed but token is valid — still authenticated
        set({ isLoading: false })
      }
    } catch {
      // Refresh failed — clear stale token
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      set({ isLoading: false })
    }
  },

  /**
   * Admin login. Persists refresh token to localStorage.
   */
  login: async (email, password) => {
    const data = await loginAdmin({ email, password })

    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)

    set({
      user: data.user,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      isAuthenticated: true,
    })

    return data
  },

  /**
   * Logout. Clears all state and storage.
   */
  logout: async () => {
    await logoutAdmin()
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    })
  },

  /**
   * Update local user state after profile edits (name, email, avatar).
   */
  updateUser: (updatedUser) => {
    set((state) => ({ user: { ...state.user, ...updatedUser } }))
  },

  /**
   * Silent token refresh. Called by axios interceptor on 401.
   * Returns new access token string.
   */
  refreshAccessToken: async () => {
    const storedRefreshToken = get().refreshToken
      || localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!storedRefreshToken) {
      throw new Error('No refresh token available')
    }

    const data = await refreshToken(storedRefreshToken)

    set({ accessToken: data.access_token })
    return data.access_token
  },
}))

// Wire token getters into axios client (avoids circular import / require)
setTokenGetters(
  () => useAuthStore.getState().accessToken,
  () => useAuthStore.getState().refreshToken
)
