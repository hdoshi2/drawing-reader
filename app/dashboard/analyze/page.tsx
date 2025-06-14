// app/analyze/page.tsx (or your desired route)
'use client'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, Search, Brain, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePDFTextStorage } from '@/hooks/usePDFTextStorage'
import { usePDFAnalyzer } from '@/hooks/usePDFAnalyzer'
import ConstructionDocumentPreview from '@/components/analyze/PDFTextPreview'
import ConstructionStatusMessages from '@/components/analyze/AnalysisStatusMessages'
import ConstructionDataSkeleton from '@/components/analyze/ConstructionDataSkeleton'
import ConstructionDataDisplay from '@/components/analyze/ConstructionDataDisplay'

export default function PDFAnalyzerPage(): JSX.Element {
  const { extractedTextData, hasStoredText } = usePDFTextStorage()
  const {
    extractConstructionData,
    loading,
    error,
    successMessage,
    constructionData,
    selectedProvider,
    setSelectedProvider
  } = usePDFAnalyzer()

  const handleExtractData = async (): Promise<void> => {
    if (extractedTextData) {
      await extractConstructionData(extractedTextData.text, selectedProvider)
    }
  }

  const handleProviderChange = (provider: 'claude' | 'gemini'): void => {
    setSelectedProvider(provider)
  }

  const getProviderDisplayName = (provider: string): string => {
    return provider === 'claude' ? 'Claude' : 'Gemini'
  }

  return (
    <section className='mx-auto max-w-6xl px-4 py-8'>
      {/* Header */}
      <div className='mb-6'>
        <Link
          href='/'
          className='mb-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to PDF Upload
        </Link>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>
          Construction Data Extraction
        </h1>
        <p className='text-gray-600'>
          Extract structured construction data from technical drawings,
          schedules, cut sheets, and specifications
        </p>
      </div>

      {!hasStoredText || !extractedTextData ? (
        <div className='mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6'>
          <p className='mb-2 font-medium text-yellow-800'>
            ⚠️ No PDF content found in storage.
          </p>
          <p className='mb-4 text-sm text-yellow-700'>
            Please extract text from a construction document first. We work best
            with:
          </p>
          <ul className='mb-4 list-inside list-disc space-y-1 text-sm text-yellow-700'>
            <li>Equipment schedules and cut sheets</li>
            <li>Material lists and specifications</li>
            <li>Technical drawings with annotations</li>
            <li>Fixture schedules and installation details</li>
            <li>Mechanical, electrical, and plumbing plans</li>
          </ul>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700'
          >
            Go to PDF Upload
          </Link>
        </div>
      ) : (
        <>
          {/* PDF Content Preview */}
          <ConstructionDocumentPreview extractedTextData={extractedTextData} />

          {/* AI Provider Selection */}
          <div className='mb-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
            <h3 className='mb-3 text-lg font-semibold text-gray-900'>
              Choose AI Provider for Data Extraction
            </h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Claude Option */}
              <button
                onClick={() => handleProviderChange('claude')}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  selectedProvider === 'claude'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                disabled={loading}
              >
                <div className='mb-2 flex items-center gap-3'>
                  <div
                    className={`rounded-lg p-2 ${selectedProvider === 'claude' ? 'bg-blue-100' : 'bg-gray-100'}`}
                  >
                    <Brain
                      className={`h-5 w-5 ${selectedProvider === 'claude' ? 'text-blue-600' : 'text-gray-600'}`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${selectedProvider === 'claude' ? 'text-blue-900' : 'text-gray-900'}`}
                    >
                      Claude 3.5 Sonnet
                    </h4>
                    <span className='inline-flex rounded-full bg-green-100 px-2 py-1 text-xs text-green-700'>
                      Recommended
                    </span>
                  </div>
                </div>
                <p
                  className={`text-sm ${selectedProvider === 'claude' ? 'text-blue-700' : 'text-gray-600'}`}
                >
                  Superior instruction-following, better understanding of
                  technical construction documents. More detailed and accurate
                  extraction results.
                </p>
              </button>

              {/* Gemini Option */}
              <button
                onClick={() => handleProviderChange('gemini')}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  selectedProvider === 'gemini'
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                disabled={loading}
              >
                <div className='mb-2 flex items-center gap-3'>
                  <div
                    className={`rounded-lg p-2 ${selectedProvider === 'gemini' ? 'bg-orange-100' : 'bg-gray-100'}`}
                  >
                    <Zap
                      className={`h-5 w-5 ${selectedProvider === 'gemini' ? 'text-orange-600' : 'text-gray-600'}`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${selectedProvider === 'gemini' ? 'text-orange-900' : 'text-gray-900'}`}
                    >
                      Gemini 1.5 Flash
                    </h4>
                    <span className='inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700'>
                      Fast & Cost-Effective
                    </span>
                  </div>
                </div>
                <p
                  className={`text-sm ${selectedProvider === 'gemini' ? 'text-orange-700' : 'text-gray-600'}`}
                >
                  Faster processing for simpler documents. Good baseline
                  performance and more cost-effective for high-volume
                  processing.
                </p>
              </button>
            </div>
          </div>

          {/* Data Extraction Info */}
          <div className='mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
            <h3 className='mb-2 font-semibold text-blue-900'>
              What We'll Extract:
            </h3>
            <div className='grid grid-cols-2 gap-2 text-sm text-blue-700 md:grid-cols-3'>
              <div>• Item/Fixture Types</div>
              <div>• Quantities & Units</div>
              <div>• Model Numbers</div>
              <div>• Dimensions & Specs</div>
              <div>• Mounting Details</div>
              <div>• Page References</div>
            </div>
          </div>

          {/* Extract Button */}
          <div className='mb-6'>
            <Button
              onClick={handleExtractData}
              disabled={loading || !hasStoredText}
              className={`px-8 py-3 text-lg ${
                selectedProvider === 'claude'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              } text-white disabled:bg-gray-400`}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Extracting with {getProviderDisplayName(selectedProvider)}...
                </>
              ) : (
                <>
                  <Search className='mr-2 h-5 w-5' />
                  Extract Data with {getProviderDisplayName(selectedProvider)}
                </>
              )}
            </Button>
          </div>

          {/* Status Messages */}
          <ConstructionStatusMessages
            error={error}
            successMessage={successMessage}
          />

          {/* Loading Skeleton */}
          {loading && <ConstructionDataSkeleton />}

          {/* Construction Data Results */}
          {constructionData && !loading && (
            <div className='mt-6'>
              <div
                className={`mb-6 rounded-lg border p-4 ${
                  constructionData.aiProvider === 'claude'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className='mb-2 flex items-center gap-2'>
                  {constructionData.aiProvider === 'claude' ? (
                    <Brain className='h-5 w-5 text-blue-600' />
                  ) : (
                    <Zap className='h-5 w-5 text-orange-600' />
                  )}
                  <h2
                    className={`text-xl font-semibold ${
                      constructionData.aiProvider === 'claude'
                        ? 'text-blue-900'
                        : 'text-orange-900'
                    }`}
                  >
                    Construction Data Extraction Complete
                  </h2>
                </div>
                <p
                  className={`text-sm ${
                    constructionData.aiProvider === 'claude'
                      ? 'text-blue-700'
                      : 'text-orange-700'
                  }`}
                >
                  Successfully extracted {constructionData.totalItemsFound}{' '}
                  items using{' '}
                  {getProviderDisplayName(
                    constructionData.aiProvider || selectedProvider
                  )}{' '}
                  from: {extractedTextData.fileName}
                </p>
              </div>
              <ConstructionDataDisplay data={constructionData} />
            </div>
          )}

          {/* Provider Comparison Info */}
          <div className='mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4'>
            <h4 className='mb-2 font-semibold text-gray-900'>
              💡 Which AI should I choose for construction data?
            </h4>
            <div className='space-y-1 text-sm text-gray-600'>
              <p>
                <strong>Claude:</strong> Best for complex technical documents,
                detailed equipment schedules, and accurate specification
                extraction. Superior understanding of construction terminology.
              </p>
              <p>
                <strong>Gemini:</strong> Good for simpler material lists, basic
                schedules, and when you need faster processing. More
                cost-effective for high-volume document processing.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
