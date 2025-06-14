// app/page.tsx or your main page component
'use client'
import FileUploadZone from '@/components/misc/FileUploadZone'
import StatusMessages from '@/components/misc/StatusMessages'
import ExtractedTextDisplay from '@/components/misc/ExtractedTextDisplay'
import ApiSetupInstructions from '@/components/misc/ApiSetupInstructions'
import StoredTextIndicator from '@/components/misc/StoredTextIndicator'
import { usePDFUpload } from '@/hooks/usePDFUpload'

export default function PDFUploadPage() {
  const {
    file,
    extractedText,
    isProcessing,
    error,
    success,
    handleFileSelect,
    extractTextFromPDF,
    handleReset,
    copyToClipboard,
    downloadText,
    testApiEndpoint,
    clearExtractedText,
    hasStoredText,
    extractedTextData,
  } = usePDFUpload()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Text Extractor</h1>
        <p className="text-gray-600">Upload a PDF document to extract all text content</p>
      </div>

      <StoredTextIndicator
        extractedTextData={extractedTextData}
        hasStoredText={hasStoredText}
        onClearStoredText={clearExtractedText}
      />

      <FileUploadZone
        file={file}
        onFileSelect={handleFileSelect}
        onExtractText={extractTextFromPDF}
        onReset={handleReset}
        isProcessing={isProcessing}
      />

      <StatusMessages
        error={error}
        success={success}
        extractedTextLength={extractedText.length}
      />

      <ExtractedTextDisplay
        extractedText={extractedText}
        fileName={file?.name}
        onCopyToClipboard={copyToClipboard}
        onDownloadText={downloadText}
      />

      {!extractedText && !isProcessing && (
        <ApiSetupInstructions onTestApiEndpoint={testApiEndpoint} />
      )}
    </div>
  )
}