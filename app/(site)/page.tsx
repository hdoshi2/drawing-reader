'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button' // Adjust path if needed
import { Upload, Search, Download, Building, FileText, Zap, Package } from 'lucide-react'
import { usePDFTextStorage } from '../../hooks/usePDFTextStorage' // Adjust path if needed

export default function MainPage(): JSX.Element {
  const router = useRouter()
  const { hasStoredText, extractedTextData } = usePDFTextStorage()

  const handleUploadNavigate = () => {
    router.push('/dashboard/extract')
  }

  const handleAnalyzeNavigate = () => {
    router.push('/dashboard/analyze')
  }

  return (
    <main className='mx-auto max-w-5xl px-6 py-28 space-y-12'>
      {/* Hero Section */}
      <header className='text-center space-y-6'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='p-3 bg-blue-100 rounded-xl'>
            <Building className='h-8 w-8 text-blue-600' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900'>PDF Construction Data Extractor</h1>
        </div>
        <p className='text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed'>
          An AI-powered tool that extracts structured construction data from technical PDFs including equipment schedules, 
          specifications, cut sheets, and construction drawings. Transform unstructured documents into actionable project data.
        </p>
      </header>

      {/* AI Integration Section */}
      <section className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8'>
        <div className='flex items-center gap-3 mb-4'>
          <Zap className='h-6 w-6 text-blue-600' />
          <h2 className='text-2xl font-semibold text-gray-800'>🧠 Dual AI Integration</h2>
        </div>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-blue-200'>
            <h3 className='text-lg font-semibold text-blue-900 mb-2'>Claude API (Recommended)</h3>
            <ul className='text-gray-700 space-y-1 text-sm'>
              <li>• Superior instruction-following for consistent JSON output</li>
              <li>• Better understanding of technical construction terminology</li>
              <li>• More reliable structured data extraction</li>
              <li>• Detailed and accurate results</li>
            </ul>
          </div>
          <div className='bg-white p-6 rounded-lg border border-blue-200'>
            <h3 className='text-lg font-semibold text-blue-900 mb-2'>Gemini API (Alternative)</h3>
            <ul className='text-gray-700 space-y-1 text-sm'>
              <li>• Faster processing for simpler documents</li>
              <li>• Cost-effective for high-volume processing</li>
              <li>• Good baseline performance</li>
              <li>• Budget-friendly option</li>
            </ul>
          </div>
        </div>
        <p className='text-blue-800 mt-4 font-medium'>
          <strong>Key Finding:</strong> Claude consistently provides more detailed and accurate construction data extraction, 
          making it the preferred choice for complex technical documents.
        </p>
      </section>

      {/* Features Overview */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>🔧 What We Extract</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='text-blue-600 mb-3'>
              <Package className='h-8 w-8' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Equipment & Fixtures</h3>
            <ul className='text-gray-700 text-sm space-y-1'>
              <li>• HVAC equipment and ductwork</li>
              <li>• Electrical conduit and fixtures</li>
              <li>• Plumbing pipes and fixtures</li>
              <li>• Fire protection systems</li>
            </ul>
          </div>
          
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='text-green-600 mb-3'>
              <FileText className='h-8 w-8' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Specifications</h3>
            <ul className='text-gray-700 text-sm space-y-1'>
              <li>• Model numbers and part references</li>
              <li>• Quantities with units (EA, LF, SF)</li>
              <li>• Dimensions and capacities</li>
              <li>• Mounting and installation details</li>
            </ul>
          </div>
          
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='text-purple-600 mb-3'>
              <Search className='h-8 w-8' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>References</h3>
            <ul className='text-gray-700 text-sm space-y-1'>
              <li>• Page and drawing references</li>
              <li>• Specification section numbers</li>
              <li>• Installation requirements</li>
              <li>• Material and finish details</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>📋 How It Works</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='text-center space-y-3'>
            <div className='mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
              <Upload className='h-8 w-8 text-blue-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>1. Upload PDF</h3>
            <p className='text-gray-600 text-sm'>
              Upload construction documents including schedules, cut sheets, specifications, and technical drawings.
            </p>
          </div>
          
          <div className='text-center space-y-3'>
            <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
              <Search className='h-8 w-8 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>2. AI Analysis</h3>
            <p className='text-gray-600 text-sm'>
              Our AI analyzes the document content and extracts structured construction data with intelligent categorization.
            </p>
          </div>
          
          <div className='text-center space-y-3'>
            <div className='mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center'>
              <Download className='h-8 w-8 text-purple-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900'>3. Export Data</h3>
            <p className='text-gray-600 text-sm'>
              Review extracted data in professional tables and export to CSV, material lists, or procurement reports.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className='bg-gray-50 rounded-xl p-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>📄 Supported Document Types</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>Equipment Schedules</h4>
            <p className='text-sm text-gray-600'>HVAC, electrical, plumbing fixture schedules</p>
          </div>
          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>Cut Sheets</h4>
            <p className='text-sm text-gray-600'>Manufacturer specifications and details</p>
          </div>
          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>Technical Drawings</h4>
            <p className='text-sm text-gray-600'>Annotated plans and construction details</p>
          </div>
          <div className='bg-white p-4 rounded-lg border border-gray-200'>
            <h4 className='font-semibold text-gray-900 mb-2'>Specifications</h4>
            <p className='text-sm text-gray-600'>Technical requirements and material lists</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='text-center space-y-6 bg-blue-600 text-white rounded-xl p-8'>
        <h2 className='text-2xl font-semibold'>🚀 Ready to Extract Construction Data?</h2>
        <p className='text-blue-100 max-w-2xl mx-auto'>
          Upload your first construction document and see how AI can transform your project workflow. 
          Extract equipment lists, quantities, and specifications in seconds.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button
            onClick={handleUploadNavigate}
            className='bg-white text-blue-600 hover:bg-blue-50'
          >
            <Upload className='mr-2 h-4 w-4' />
            Upload PDF Document
          </Button>
          {hasStoredText && (
            <Button
              onClick={handleAnalyzeNavigate}
              className='bg-blue-500 text-white hover:bg-blue-400 border border-blue-400'
            >
              <Search className='mr-2 h-4 w-4' />
              Analyze Stored Document
            </Button>
          )}
        </div>
      </section>

      {/* Industry Impact */}
      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-gray-800 text-center'>🎯 Construction Industry Impact</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-900'>Eliminates Manual Work</h3>
            <ul className='text-gray-700 space-y-1'>
              <li>• No more manual data entry from technical documents</li>
              <li>• Reduces procurement errors through structured extraction</li>
              <li>• Accelerates project scheduling with automated takeoffs</li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-900'>Improves Coordination</h3>
            <ul className='text-gray-700 space-y-1'>
              <li>• Standardized data format across all trades</li>
              <li>• Enhanced quality control with consistent tracking</li>
              <li>• Better project visibility and coordination</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}