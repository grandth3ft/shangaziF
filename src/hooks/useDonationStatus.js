import { useEffect, useRef, useCallback } from 'react'
import { getDonationStatus } from '@/api/donations'
import { useDonationStore } from '@/store/donationStore'

const POLL_INTERVAL_MS = 3000
const MAX_POLLS        = 20  // 60 seconds

/**
 * useDonationStatus — polls the backend for payment status.
 * Cleans up on unmount and stops automatically on terminal states.
 * Uses a ref-based latest-values pattern to avoid stale closures.
 */
export function useDonationStatus() {
  const store         = useDonationStore()
  const intervalRef   = useRef(null)
  const pollCountRef  = useRef(0)

  // Keep refs up to date without re-running effect
  const stepRef                = useRef(store.step)
  const checkoutRequestIdRef   = useRef(store.checkoutRequestId)

  useEffect(() => { stepRef.current              = store.step }, [store.step])
  useEffect(() => { checkoutRequestIdRef.current = store.checkoutRequestId }, [store.checkoutRequestId])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const poll = useCallback(async () => {
    const step             = stepRef.current
    const checkoutId       = checkoutRequestIdRef.current

    if (step !== 'pending' || !checkoutId) { stopPolling(); return }

    pollCountRef.current += 1
    useDonationStore.getState().incrementPollCount()

    if (pollCountRef.current > MAX_POLLS) {
      stopPolling()
      useDonationStore.getState().setFailed(
        'Payment confirmation timed out after 60 seconds. Please check your M-Pesa messages and try again.'
      )
      return
    }

    try {
      const result = await getDonationStatus(checkoutId)
      switch (result.payment_status) {
        case 'completed':
          stopPolling()
          useDonationStore.getState().setSuccess(result.mpesa_receipt_number)
          break
        case 'failed':
          stopPolling()
          useDonationStore.getState().setFailed(result.message)
          break
        case 'cancelled':
          stopPolling()
          useDonationStore.getState().setFailed('You cancelled the payment. No charges were made.')
          break
        default:
          // pending — keep polling
          break
      }
    } catch (err) {
      // Network hiccup — log but don't stop polling yet
      console.warn('[useDonationStatus] poll error:', err.message)
    }
  }, [stopPolling])

  useEffect(() => {
    if (store.step !== 'pending' || !store.checkoutRequestId) return

    // Reset counter when a new pending session starts
    pollCountRef.current = 0

    // Immediate first poll, then interval
    poll()
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS)

    return stopPolling
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.step, store.checkoutRequestId])
}
