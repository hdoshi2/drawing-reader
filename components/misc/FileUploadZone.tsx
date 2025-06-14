'use client'
import { useRef } from 'react'
import { Upload, FileText } from 'lucide-react'

interface FileUploadZoneProps {
  file: File | null
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onExtractText: () => void
  onReset: () => void
  isProcessing: boolean
}

export default function FileUploadZone({
  file,
  onFileSelect,
  onExtractText,
  onReset,
  isProcessing
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mb-8">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={onFileSelect}
        className="hidden"
      />

      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="text-lg font-medium text-gray-700 mb-2">
          Click to upload PDF document
        </div>
        <div className="text-sm text-gray-500">
          Maximum file size: 5MB
        </div>
      </div>

      {/* File Info */}
      {file && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="font-medium text-blue-900">{file.name}</div>
              <div className="text-sm text-blue-700">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onExtractText}
                disabled={isProcessing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  'Extract Text'
                )}
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}