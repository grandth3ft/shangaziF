import { create } from 'zustand'
import { initiateDonation } from '@/api/donations'

export const useDonationStore = create((set, get) => ({
  // ── State ────────────────────────────────────────────────────────────────
  step: 'form', // 'form' | 'pending' | 'success' | 'failed'
  checkoutRequestId: null,
  donationId: null,
  amount: null,
  donorName: null,
  receiptNumber: null,
  pollCount: 0,
  error: null,

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * Submit donation form. Calls API, sets step to 'pending'.
   * Throws on error so DonationForm can show field-level feedback.
   */
  initiateDonation: async ({ donor_name, phone_number, amount }) => {
    set({ error: null })

    const result = await initiateDonation({ donor_name, phone_number, amount })

    set({
      step: 'pending',
      checkoutRequestId: result.checkout_request_id,
      donationId: result.donation_id,
      amount,
      donorName: donor_name,
      pollCount: 0,
    })

    return result
  },

  /**
   * Called by polling hook when status = 'completed'
   */
  setSuccess: (receiptNumber) => {
    set({
      step: 'success',
      receiptNumber,
    })
  },

  /**
   * Called by polling hook when status = 'failed' or 'cancelled'
   */
  setFailed: (message) => {
    set({
      step: 'failed',
      error: message || 'Payment was not completed.',
    })
  },

  /**
   * Increment poll counter (used by polling hook to enforce max polls)
   */
  incrementPollCount: () => {
    set((state) => ({ pollCount: state.pollCount + 1 }))
  },

  /**
   * Reset form to initial state (used by "Donate again" and "Try again")
   */
  reset: () => {
    set({
      step: 'form',
      checkoutRequestId: null,
      donationId: null,
      amount: null,
      donorName: null,
      receiptNumber: null,
      pollCount: 0,
      error: null,
    })
  },
}))
