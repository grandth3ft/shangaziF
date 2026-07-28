import { publicClient, getApiError } from './client'

/**
 * POST /api/donations/initiate
 * Triggers M-Pesa STK Push
 *
 * @param {Object} payload
 * @param {string} payload.donor_name
 * @param {string} payload.phone_number  - Kenyan format: 07XXXXXXXX or +2547XXXXXXXX
 * @param {number} payload.amount        - KES, min 10, max 999999
 *
 * @returns {{ donation_id, checkout_request_id, message }}
 */
export async function initiateDonation(payload) {
  try {
    const response = await publicClient.post('/api/donations/initiate', payload)
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}

/**
 * GET /api/donations/status/:checkoutRequestId
 * Poll for payment status. Frontend polls every 3s for up to 60s.
 *
 * @param {string} checkoutRequestId
 * @returns {{ donation_id, payment_status, amount, mpesa_receipt_number, message }}
 */
export async function getDonationStatus(checkoutRequestId) {
  try {
    const response = await publicClient.get(
      `/api/donations/status/${checkoutRequestId}`
    )
    return response.data.data
  } catch (error) {
    throw new Error(getApiError(error))
  }
}
