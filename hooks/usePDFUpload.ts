// hooks/usePDFUpload.ts
import { useState, useEffect } from 'react'
import { usePDFTextStorage } from './usePDFTextStorage'

export interface UsePDFUploadReturn {
  // State
  file: File | null
  extractedText: string
  isProcessing: boolean
  error: string | null
  success: boolean

  // Actions
  clearExtractedText: () => void
  hasStoredText: boolean
  extractedTextData: any // From storage hook
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  extractTextFromPDF: () => Promise<void>
  handleReset: () => void
  copyToClipboard: () => void
  downloadText: () => void
  testApiEndpoint: () => Promise<void>
}

export function usePDFUpload(): UsePDFUploadReturn {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    extractedTextData,
    saveExtractedText,
    clearExtractedText,
    hasStoredText
  } = usePDFTextStorage()

  // Load stored text on mount
  useEffect(() => {
    if (extractedTextData && !extractedText) {
      setExtractedText(extractedTextData.text)
      setSuccess(true)
    }
  }, [extractedTextData, extractedText])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setError(null)
    setSuccess(false)
    setExtractedText('')

    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }

    if (selectedFile.size > 30 * 1024 * 1024) {
      // 30MB limit
      setError('File size must be less than 30MB')
      return
    }

    setFile(selectedFile)
  }

  const extractTextFromPDF = async () => {
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      console.log('Starting PDF extraction for:', file.name)

      const formData = new FormData()
      formData.append('pdf', file)

      console.log('Sending request to /api/extract-pdf')

      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API Error (${response.status}): ${errorText}`)
      }

      const result = await response.json()
      console.log('Extraction successful, text length:', result.text?.length)

      if (!result.text) {
        throw new Error('No text was extracted from the PDF')
      }

      setExtractedText(result.text)
      setSuccess(true)

      // Save to localStorage
      if (file) {
        saveExtractedText(result.text, file.name, file.size)
      }
    } catch (err) {
      console.error('PDF extraction error:', err)
      // Uncomment if you want to show error messages to users
      // setError(`Failed to extract text: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setExtractedText('')
    setError(null)
    setSuccess(false)
    clearExtractedText() // Clear from localStorage
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const downloadText = () => {
    if (!file || !extractedText) return

    const blob = new Blob([extractedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file.name.replace('.pdf', '')}_extracted.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const testApiEndpoint = async () => {
    try {
      const response = await fetch('/api/extract-pdf', {
        method: 'GET'
      })
      console.log('API Test - Status:', response.status)
      const text = await response.text()
      console.log('API Test - Response:', text)

      if (response.status === 405) {
        setError(
          '✅ API endpoint exists but only accepts POST requests (this is correct)'
        )
      } else {
        setError(`API Test Result: Status ${response.status} - ${text}`)
      }
    } catch (err) {
      console.error('API test error:', err)
      // Uncomment if you want to show API connection errors
      // setError(`❌ API endpoint not found: ${err instanceof Error ? err.message : 'Connection failed'}`)
    }
  }

  return {
    // State
    file,
    extractedText,
    isProcessing,
    error,
    success,

    // Actions
    handleFileSelect,
    extractTextFromPDF,
    handleReset,
    copyToClipboard,
    downloadText,
    testApiEndpoint,
    clearExtractedText,
    hasStoredText,
    extractedTextData
  }
}
