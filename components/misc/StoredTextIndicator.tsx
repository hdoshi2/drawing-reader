// components/StoredTextIndicator.tsx
import { FileText, Clock, Trash2 } from 'lucide-react'

interface StoredTextIndicatorProps {
  extractedTextData: {
    text: string
    fileName: string
    extractedAt: string
    fileSize: number
  } | null
  hasStoredText: boolean
  onClearStoredText: () => void
}

export default function StoredTextIndicator({
  extractedTextData,
  hasStoredText,
  onClearStoredText
}: StoredTextIndicatorProps) {
  if (!hasStoredText || !extractedTextData) return null

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString()
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  return (
    <div className='mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4'>
      <div className='flex items-start gap-3'>
        <FileText className='mt-0.5 h-5 w-5 text-amber-600' />
        <div className='flex-1'>
          <div className='mb-1 font-medium text-amber-900'>
            PDF data stored
          </div>
          <div className='space-y-1 text-sm text-amber-700'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>File:</span>
              <span>{extractedTextData.fileName}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-3 w-3' />
              <span>
                Extracted: {formatDate(extractedTextData.extractedAt)}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Size:</span>
              <span>{formatFileSize(extractedTextData.fileSize)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Text Length:</span>
              <span>{extractedTextData.text.length} characters</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClearStoredText}
          className='flex items-center gap-1 rounded-md bg-amber-100 px-3 py-1 text-sm text-amber-700 transition-colors hover:bg-amber-200'
          title='Clear stored text'
        >
          <Trash2 className='h-3 w-3' />
          Clear
        </button>
      </div>
    </div>
  )
}
