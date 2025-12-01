import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { AlertCircle, Home, RefreshCw, ArrowLeft } from 'lucide-react'

export default function ErrorBoundary() {
  const error = useRouteError()

  let message = 'Unexpected error occurred'
  let status = 500

  if (isRouteErrorResponse(error)) {
    status = error.status
    message = error.statusText || message
  } else if (error instanceof Error) {
    message = error.message
  }

  const getErrorTitle = () => {
    switch (status) {
      case 404:
        return 'Page Not Found'
      case 403:
        return 'Access Forbidden'
      case 500:
        return 'Internal Server Error'
      default:
        return 'Something Went Wrong'
    }
  }

  const getErrorDescription = () => {
    switch (status) {
      case 404:
        return "The page you're looking for doesn't exist or has been moved."
      case 403:
        return "You don't have permission to access this resource."
      case 500:
        return 'The server encountered an error and could not complete your request.'
      default:
        return 'An unexpected error occurred. Please try again later.'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">{status}</h1>
          <h2 className="text-2xl font-semibold tracking-tight">{getErrorTitle()}</h2>
          <p className="text-sm text-muted-foreground">{getErrorDescription()}</p>
        </div>

        {/* Technical Details */}
        {message && message !== 'Unexpected error occurred' && (
          <div className="rounded-lg border border-border bg-muted p-4">
            <p className="text-xs font-mono text-muted-foreground break-words">{message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          <button
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-muted-foreground">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  )
}
