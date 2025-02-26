"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react"

export type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = React.useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, message, type }])

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 p-4 space-y-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [progress, setProgress] = React.useState(100)
  const [isExiting, setIsExiting] = React.useState(false)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) {
          return prev - 2
        }
        clearInterval(timer)
        return 0
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const handleRemove = () => {
    setIsExiting(true)
    // Wait for animation to finish before removing
    setTimeout(() => {
      onRemove(toast.id)
    }, 300)
  }

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    error: <XCircle className="w-6 h-6 text-red-600" />,
    warning: <AlertCircle className="w-6 h-6 text-yellow-600" />,
    info: <Info className="w-6 h-6 text-blue-600" />,
  }

  const bgColors = {
    success: "bg-green-50 dark:bg-green-900/30",
    error: "bg-red-50 dark:bg-red-900/30",
    warning: "bg-yellow-50 dark:bg-yellow-900/30",
    info: "bg-blue-50 dark:bg-blue-900/30",
  }

  const borderColors = {
    success: "border-green-600/20",
    error: "border-red-600/20",
    warning: "border-yellow-600/20",
    info: "border-blue-600/20",
  }

  const progressColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-600",
    info: "bg-blue-600",
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border shadow-lg w-[320px]
        animate-in fade-in slide-in-from-bottom-4 duration-300
        ${isExiting ? "animate-out fade-out slide-out-to-bottom-4" : ""}
        ${bgColors[toast.type]} ${borderColors[toast.type]}
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {icons[toast.type]}
          <p className="text-sm text-gray-900 dark:text-gray-100">{toast.message}</p>
          <button onClick={handleRemove} className="ml-auto -mr-2 -mt-2 p-2 hover:opacity-70">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800">
        <div
          className={`h-full transition-all duration-100 ${progressColors[toast.type]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

