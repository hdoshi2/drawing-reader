// components/ConstructionDocumentPreview.tsx
import { FileText, Calendar, HardDrive, Type, Eye, Search, Building } from 'lucide-react'

interface ConstructionDocumentPreviewProps {
  extractedTextData: {
    text: string
    fileName: string
    extractedAt: string
    fileSize: number
  }
}

export default function ConstructionDocumentPreview({ extractedTextData }: ConstructionDocumentPreviewProps) {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  const previewText = extractedTextData.text.length > 800 
    ? extractedTextData.text.substring(0, 800) + '...' 
    : extractedTextData.text

  const wordCount = extractedTextData.text.split(' ').length
  const charCount = extractedTextData.text.length
  const lineCount = extractedTextData.text.split('\n').length

  // Detect document type based on content
  const detectDocumentType = (text: string): { type: string; confidence: string; icon: React.ReactNode } => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('schedule') && (lowerText.includes('equipment') || lowerText.includes('fixture'))) {
      return { type: 'Equipment/Fixture Schedule', confidence: 'High', icon: <Building className="h-4 w-4" /> }
    }
    if (lowerText.includes('mechanical') || lowerText.includes('hvac') || lowerText.includes('ductwork')) {
      return { type: 'Mechanical Plans/Specs', confidence: 'High', icon: <Building className="h-4 w-4" /> }
    }
    if (lowerText.includes('electrical') || lowerText.includes('conduit') || lowerText.includes('lighting')) {
      return { type: 'Electrical Plans/Specs', confidence: 'High', icon: <Building className="h-4 w-4" /> }
    }
    if (lowerText.includes('plumbing') || lowerText.includes('pipe') || lowerText.includes('fixture')) {
      return { type: 'Plumbing Plans/Specs', confidence: 'High', icon: <Building className="h-4 w-4" /> }
    }
    if (lowerText.includes('material') && lowerText.includes('list')) {
      return { type: 'Material List', confidence: 'Medium', icon: <Building className="h-4 w-4" /> }
    }
    if (lowerText.includes('specification') || lowerText.includes('section')) {
      return { type: 'Technical Specifications', confidence: 'Medium', icon: <Building className="h-4 w-4" /> }
    }
    return { type: 'Construction Document', confidence: 'Low', icon: <Building className="h-4 w-4" /> }
  }

  const documentAnalysis = detectDocumentType(extractedTextData.text)

  // Quick content indicators
  const hasNumbers = /\d+/.test(extractedTextData.text)
  const hasDimensions = /\d+["']|\d+\s*(inch|ft|mm|cm|in)/.test(extractedTextData.text)
  const hasModelNumbers = /model|part|#|\bno\.\s*\w+/i.test(extractedTextData.text)
  const hasTables = /\t|\|/.test(extractedTextData.text) || extractedTextData.text.split('\n').some(line => line.split(/\s+/).length > 5)

  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Construction Document Analysis</h3>
            <p className="text-sm text-gray-600">Ready for data extraction and analysis</p>
          </div>
        </div>

        {/* Document Info Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">File Name</div>
              <div className="text-sm font-medium text-gray-900 truncate" title={extractedTextData.fileName}>
                {extractedTextData.fileName.length > 20 
                  ? extractedTextData.fileName.substring(0, 20) + '...' 
                  : extractedTextData.fileName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Extracted</div>
              <div className="text-sm font-medium text-gray-900">{formatDate(extractedTextData.extractedAt)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <HardDrive className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">File Size</div>
              <div className="text-sm font-medium text-gray-900">{formatFileSize(extractedTextData.fileSize)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Type className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Content Size</div>
              <div className="text-sm font-medium text-gray-900">{wordCount.toLocaleString()} words</div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Analysis */}
      <div className="p-4 bg-white border-b border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Document Analysis</h4>
          <span className={`px-2 py-1 text-xs rounded-full ${
            documentAnalysis.confidence === 'High' ? 'bg-green-100 text-green-700' :
            documentAnalysis.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {documentAnalysis.confidence} Confidence
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {documentAnalysis.icon}
          <span className="font-medium text-blue-900">{documentAnalysis.type}</span>
        </div>

        {/* Content Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className={`flex items-center gap-2 p-2 rounded-lg ${hasNumbers ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${hasNumbers ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs font-medium">Numbers/Quantities</span>
          </div>
          
          <div className={`flex items-center gap-2 p-2 rounded-lg ${hasDimensions ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${hasDimensions ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs font-medium">Dimensions</span>
          </div>
          
          <div className={`flex items-center gap-2 p-2 rounded-lg ${hasModelNumbers ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${hasModelNumbers ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs font-medium">Model Numbers</span>
          </div>
          
          <div className={`flex items-center gap-2 p-2 rounded-lg ${hasTables ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${hasTables ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-xs font-medium">Tabular Data</span>
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-gray-500" />
          <h4 className="font-medium text-gray-900">Content Preview</h4>
          <span className="text-xs text-gray-500">({charCount.toLocaleString()} characters, {lineCount} lines)</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono leading-relaxed">
            {previewText}
          </pre>
        </div>
        
        {extractedTextData.text.length > 800 && (
          <div className="flex items-center justify-center gap-2 mt-3 p-2 bg-blue-50 rounded-lg">
            <Search className="h-3 w-3 text-blue-600" />
            <p className="text-xs text-blue-700 font-medium">
              Showing first 800 characters. Full document will be analyzed for construction data extraction.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}