import { privateClient, getApiError } from './client'

/**
 * GET /api/admin/donations
 * Paginated, filterable donation list.
 *
 * @param {Object} params
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {string} [params.status]     - pending|completed|failed|cancelled
 * @param {string} [params.search]     - donor name, phone, or receipt
 * @param {string} [params.date_from]  - YYYY-MM-DD
 * @param {string} [params.date_to]    - YYYY-MM-DD
 *
 * @returns {{ donations: Donation[], pagination: Pagination }}
 */
export async function getDonations(params = {}) {
  try {
    // Strip undefined/null/empty values
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== null && v !== undefined && v !== '')
    )
    const response = await privateClient.get('/api/admin/donations', { params: cleanParams })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * GET /api/admin/donations/:id
 * @param {string} id
 * @returns {Donation}
 */
export async function getDonation(id) {
  try {
    const response = await privateClient.get(`/api/admin/donations/${id}`)
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * GET /api/admin/stats
 * @returns {{ total_donations, completed_donations, failed_donations, pending_donations, total_amount_collected }}
 */
export async function getStats() {
  try {
    const response = await privateClient.get('/api/admin/stats')
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * GET /api/admin/export
 * Downloads CSV file of donations.
 * @param {string} [status] - optional filter
 */
export async function exportDonationsCSV(status) {
  try {
    const params = status ? { status } : {}
    const response = await privateClient.get('/api/admin/export', {
      params,
      responseType: 'blob',
    })

    // Trigger browser download
    const blob = new Blob([response.data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `shangazi-donations-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * GET /api/admin/audit-logs
 * Super admin only.
 * @param {{ page, per_page }} params
 * @returns {{ logs: AuditLog[], pagination: Pagination }}
 */
export async function getAuditLogs(params = {}) {
  try {
    const response = await privateClient.get('/api/admin/audit-logs', { params })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

// ── Gallery ──────────────────────────────────────────────────────────────────

export async function getAdminGallery(params = {}) {
  try {
    const response = await privateClient.get('/api/admin/gallery', { params })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function uploadGalleryImage(formData) {
  try {
    const response = await privateClient.post('/api/admin/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function updateGalleryImage(id, payload) {
  try {
    const response = await privateClient.put(`/api/admin/gallery/${id}`, payload)
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function deleteGalleryImage(id) {
  try {
    await privateClient.delete(`/api/admin/gallery/${id}`)
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

// ── Impact Stories ───────────────────────────────────────────────────────────

export async function getAdminImpactStories(params = {}) {
  try {
    const response = await privateClient.get('/api/admin/impact-stories', { params })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function createImpactStory(formData) {
  try {
    const response = await privateClient.post('/api/admin/impact-stories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function updateImpactStory(id, formData) {
  try {
    const response = await privateClient.put(`/api/admin/impact-stories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function deleteImpactStory(id) {
  try {
    await privateClient.delete(`/api/admin/impact-stories/${id}`)
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

// ── Programs ─────────────────────────────────────────────────────────────────

export async function getAdminPrograms(params = {}) {
  try {
    const response = await privateClient.get('/api/admin/programs', { params })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function createProgram(formData) {
  try {
    const response = await privateClient.post('/api/admin/programs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function updateProgram(id, formData) {
  try {
    const response = await privateClient.put(`/api/admin/programs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

export async function deleteProgram(id) {
  try {
    await privateClient.delete(`/api/admin/programs/${id}`)
  } catch (error) {
    throw new Error(getApiError(error))
  }
}
