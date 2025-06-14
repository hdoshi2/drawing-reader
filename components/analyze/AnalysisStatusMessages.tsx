// components/ConstructionStatusMessages.tsx
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

interface ConstructionStatusMessagesProps {
  error: string | null
  successMessage: string | null
}

export default function ConstructionStatusMessages({ error, successMessage }: ConstructionStatusMessagesProps) {
  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-red-800 mb-1">Extraction Error</div>
            <div className="text-red-700 text-sm">{error}</div>
            <div className="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded">
              <strong>Troubleshooting tips:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Ensure the PDF contains construction data (schedules, specifications, equipment lists)</li>
                <li>Try a document with clearer text or better OCR quality</li>
                <li>Check if the document has tables, equipment schedules, or material lists</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-green-800 mb-1">Extraction Complete</div>
            <div className="text-green-700 text-sm">{successMessage}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
              <Info className="h-3 w-3" />
              <span>Review the extracted data below and use the export options for your project needs.</span>
            </div>
          </div>
        </div>
      )}

      {/* Processing Info Message (shown when neither error nor success) */}
      {!error && !successMessage && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-medium text-blue-800 mb-1">Ready for Data Extraction</div>
            <div className="text-blue-700 text-sm mb-2">
              Our AI will analyze your PDF and extract structured construction data including:
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-xs text-blue-600">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Equipment types & categories
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Quantities & units
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Model numbers & specs
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Dimensions & ratings
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Mounting & installation details
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Page & specification references
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}