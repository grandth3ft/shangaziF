import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import AppRouter from '@/router/AppRouter'
import { useAuthStore } from '@/store/authStore'

function App() {
  const initializeFromStorage = useAuthStore((s) => s.initializeFromStorage)

  // Rehydrate auth state on app mount
  useEffect(() => {
    initializeFromStorage()
  }, [initializeFromStorage])

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastClassName="font-body text-body-sm shadow-md-warm"
        style={{ zIndex: 'var(--z-toast)' }}
      />
    </>
  )
}

export default App
