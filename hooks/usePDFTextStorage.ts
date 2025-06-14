import { useState, useEffect } from 'react'

const PDF_TEXT_STORAGE_KEY = 'pdf-extracted-text'

interface ExtractedTextData {
  text: string
  fileName: string
  extractedAt: string
  fileSize: number
}

interface UsePDFTextStorageReturn {
  extractedTextData: ExtractedTextData | null
  saveExtractedText: (text: string, fileName: string, fileSize: number) => void
  clearExtractedText: () => void
  hasStoredText: boolean
}

const validateExtractedTextData = (data: any): data is ExtractedTextData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.text === 'string' &&
    typeof data.fileName === 'string' &&
    typeof data.extractedAt === 'string' &&
    typeof data.fileSize === 'number' &&
    data.text.length > 0 &&
    data.fileName.length > 0
  )
}

export const usePDFTextStorage = (): UsePDFTextStorageReturn => {
  const [extractedTextData, setExtractedTextData] =
    useState<ExtractedTextData | null>(null)

  // Load extracted text from localStorage on mount with validation
  useEffect(() => {
    const stored = localStorage.getItem(PDF_TEXT_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (validateExtractedTextData(parsed)) {
          setExtractedTextData(parsed)
        } else {
          localStorage.removeItem(PDF_TEXT_STORAGE_KEY) // Remove if corrupted
        }
      } catch {
        localStorage.removeItem(PDF_TEXT_STORAGE_KEY) // Remove if corrupted
      }
    }
  }, [])

  // Save extracted text to localStorage
  const saveExtractedText = (
    text: string,
    fileName: string,
    fileSize: number
  ) => {
    const textData: ExtractedTextData = {
      text,
      fileName,
      extractedAt: new Date().toISOString(),
      fileSize
    }

    if (validateExtractedTextData(textData)) {
      try {
        localStorage.setItem(PDF_TEXT_STORAGE_KEY, JSON.stringify(textData))
        setExtractedTextData(textData)
      } catch (error) {
        console.error('Failed to save extracted text to localStorage:', error)
      }
    }
  }

  // Clear extracted text from localStorage
  const clearExtractedText = () => {
    try {
      localStorage.removeItem(PDF_TEXT_STORAGE_KEY)
      setExtractedTextData(null)
    } catch (error) {
      console.error('Failed to clear extracted text from localStorage:', error)
    }
  }

  const hasStoredText =
    extractedTextData !== null && extractedTextData.text.length > 0

  return {
    extractedTextData,
    saveExtractedText,
    clearExtractedText,
    hasStoredText
  }
}
