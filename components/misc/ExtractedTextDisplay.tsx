interface ExtractedTextDisplayProps {
  extractedText: string
  fileName?: string
  onCopyToClipboard: () => void
  onDownloadText: () => void
}

export default function ExtractedTextDisplay({
  extractedText,
  fileName,
  onCopyToClipboard,
  onDownloadText
}: ExtractedTextDisplayProps) {
  if (!extractedText) return null

  const lineCount = extractedText.split('\n').length
  const wordCount = extractedText.split(' ').length
  const charCount = extractedText.length

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-gray-900'>Extracted Text</h2>
        <div className='flex gap-2'>
          <button
            onClick={onCopyToClipboard}
            className='rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200'
          >
            Copy to Clipboard
          </button>
          <button
            onClick={onDownloadText}
            className='rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200'
          >
            Download as TXT
          </button>
        </div>
      </div>

      <div className='max-h-96 overflow-auto rounded-lg border border-gray-300 bg-gray-50 p-4'>
        <pre className='whitespace-pre-wrap font-mono text-sm text-gray-800'>
          {extractedText}
        </pre>
      </div>

      <div className='text-center text-sm text-gray-500'>
        {lineCount} lines • {wordCount} words • {charCount} characters
      </div>
    </div>
  )
}
