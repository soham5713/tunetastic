"use client"

// Copied from https://ui.shadcn.com/docs/components/toast
import { useState, useCallback } from "react"

const TOAST_TIMEOUT = 5000

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, description, type = "default" }) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, title, description, type }])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, TOAST_TIMEOUT)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { addToast, removeToast, toasts }
}

