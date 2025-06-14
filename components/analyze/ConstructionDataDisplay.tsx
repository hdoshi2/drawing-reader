// components/ConstructionDataDisplay.tsx
import { Package, Hash, FileText, MapPin, Ruler, Wrench, AlertTriangle } from 'lucide-react'

interface ExtractedItem {
  itemType: string
  quantity: string
  modelNumber: string
  specReference: string
  pageReference: string
  dimensions: string
  mountingType: string
  additionalNotes: string
}

interface ConstructionDataResult {
  summary: string
  totalItemsFound: number
  extractedItems: ExtractedItem[]
  documentType: string
  recommendations: string[]
}

interface ConstructionDataDisplayProps {
  data: ConstructionDataResult
}

export default function ConstructionDataDisplay({ data }: ConstructionDataDisplayProps) {
  const getCategoryColor = (itemType: string): string => {
    const type = itemType.toLowerCase()
    if (type.includes('pipe') || type.includes('plumbing')) return 'bg-blue-100 text-blue-700 border-blue-200'
    if (type.includes('electrical') || type.includes('conduit')) return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    if (type.includes('duct') || type.includes('hvac')) return 'bg-green-100 text-green-700 border-green-200'
    if (type.includes('fire') || type.includes('sprinkler')) return 'bg-red-100 text-red-700 border-red-200'
    if (type.includes('light') || type.includes('fixture')) return 'bg-purple-100 text-purple-700 border-purple-200'
    return 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Document Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Document Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.totalItemsFound}</div>
            <div className="text-sm text-blue-700">Items Found</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-medium text-green-600">{data.documentType}</div>
            <div className="text-sm text-green-700">Document Type</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-medium text-purple-600">
              {new Set(data.extractedItems.map(item => item.itemType)).size}
            </div>
            <div className="text-sm text-purple-700">Categories</div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* Extracted Items Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Extracted Construction Items</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model/Part #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mounting</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.extractedItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(item.itemType)}`}>
                      {item.itemType}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3 w-3 text-gray-400" />
                      {item.quantity}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.modelNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Ruler className="h-3 w-3 text-gray-400" />
                      {item.dimensions}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Wrench className="h-3 w-3 text-gray-400" />
                      {item.mountingType}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{item.pageReference}</span>
                      </div>
                      {item.specReference !== 'N/A' && (
                        <div className="text-xs text-blue-600">{item.specReference}</div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.extractedItems.filter(item => item.additionalNotes !== 'N/A').map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(item.itemType)}`}>
                {item.itemType}
              </span>
              <span className="text-xs text-gray-500">{item.pageReference}</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{item.modelNumber}</h4>
            <p className="text-sm text-gray-600 mb-2">{item.additionalNotes}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>Qty: {item.quantity}</span>
              {item.dimensions !== 'N/A' && <span>• {item.dimensions}</span>}
              {item.mountingType !== 'N/A' && <span>• {item.mountingType}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Project Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {data.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-orange-100 text-orange-700 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="h-3 w-3" />
              </div>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Export Actions */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
            Export to CSV
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
            Generate Material List
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
            Create Procurement Report
          </button>
        </div>
      </div>
    </div>
  )
}