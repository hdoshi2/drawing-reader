import { AlertCircle, CheckCircle } from 'lucide-react'

interface StatusMessagesProps {
  error: string | null
  success: boolean
  extractedTextLength?: number
}

export default function StatusMessages({ error, success, extractedTextLength }: StatusMessagesProps) {
  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div className="text-red-700">{error}</div>
        </div>
      )}

      {/* Success Message */}
      {success && extractedTextLength && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-green-700">
            Text successfully extracted from PDF! ({extractedTextLength} characters)
          </div>
        </div>
      )}
    </>
  )
}