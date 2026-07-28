import { publicClient, privateClient, getApiError } from './client'

/**
 * GET /api/auth/profile
 * @returns {User}
 */
export async function getProfile() {
  try {
    const response = await privateClient.get('/api/auth/profile')
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * PATCH /api/auth/profile
 * @param {{ username?: string, email?: string }} payload
 * @returns {User}
 */
export async function updateProfile(payload) {
  try {
    const response = await privateClient.patch('/api/auth/profile', payload)
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * POST /api/auth/change-password
 * @param {{ current_password: string, new_password: string }} payload
 */
export async function changePassword(payload) {
  try {
    await privateClient.post('/api/auth/change-password', payload)
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * POST /api/auth/avatar
 * @param {File} file
 * @returns {User}
 */
export async function updateAvatar(file) {
  try {
    const formData = new FormData()
    formData.append('photo', file)
    const response = await privateClient.post('/api/auth/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} credentials
 * @returns {{ access_token, refresh_token, user }}
 */
export async function loginAdmin(credentials) {
  try {
    const response = await publicClient.post('/api/auth/login', credentials)
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * POST /api/auth/logout
 * Server-side is client-state only; this call is best-effort.
 */
export async function logoutAdmin() {
  try {
    await privateClient.post('/api/auth/logout')
  } catch {
    // Ignore errors — we're logging out regardless
  }
}

/**
 * POST /api/auth/refresh
 * Uses refresh token from localStorage to get a new access token.
 * @param {string} refreshToken
 * @returns {{ access_token }}
 */
export async function refreshToken(refreshToken) {
  try {
    const response = await publicClient.post(
      '/api/auth/refresh',
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    )
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}
