interface ApiSetupInstructionsProps {
  onTestApiEndpoint: () => void
}

export default function ApiSetupInstructions({
  onTestApiEndpoint
}: ApiSetupInstructionsProps) {
  const nextConfigCode = `module.exports = {
    experimental: {
      serverComponentsExternalPackages: ['pdf-parse'],
    },
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }`

  const apiRouteCode = `import pdf from 'pdf-parse';
  import { NextResponse } from 'next/server';
  
  // Configure route segment for larger files
  export const runtime = 'nodejs';
  export const maxDuration = 30; // 30 seconds timeout
  
  export async function POST(request) {
    try {
      console.log('PDF extraction API called');
      
      const formData = await request.formData();
      const file = formData.get('pdf');
      
      if (!file) {
        console.error('No file received');
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }
      
      console.log('File received:', file.name, 'Size:', file.size);
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ 
          error: 'File too large. Maximum size is 5MB.' 
        }, { status: 400 });
      }
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      console.log('Parsing PDF...');
      const data = await pdf(buffer);
      
      console.log('PDF parsed successfully, text length:', data.text.length);
      
      return NextResponse.json({ 
        text: data.text,
        pages: data.numpages,
        info: data.info 
      });
    } catch (error) {
      console.error('PDF extraction error:', error);
      return NextResponse.json({ 
        error: 'Failed to extract text from PDF',
        details: error.message 
      }, { status: 500 });
    }
  }
  
  export async function GET() {
    return NextResponse.json({ 
      message: 'PDF extraction API - POST only',
      maxSize: '5MB'
    }, { status: 405 });
  }`

  return (
    <div className='mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6'>
      <h3 className='mb-3 text-lg font-semibold text-gray-900'>
        Setup Required
      </h3>
      <p className='mb-4 text-gray-700'>
        To extract text from PDFs, you need to create an API endpoint. Here's
        how:
      </p>

      <div className='space-y-4'>
        <div className='rounded border bg-white p-4'>
          <h4 className='mb-2 font-medium text-gray-900'>
            Debug: Test API Endpoint
          </h4>
          <button
            onClick={onTestApiEndpoint}
            className='rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700'
          >
            Test API Connection
          </button>
        </div>

        <div className='rounded border bg-white p-4'>
          <h4 className='mb-2 font-medium text-gray-900'>
            1. Configure Next.js for larger files
          </h4>
          <p className='mb-2 text-sm text-gray-600'>
            Add this to your <code>next.config.js</code>:
          </p>
          <pre className='overflow-x-auto rounded bg-gray-100 p-2 text-sm'>
            <code>{nextConfigCode}</code>
          </pre>
        </div>

        <div className='rounded border bg-white p-4'>
          <h4 className='mb-2 font-medium text-gray-900'>
            2. Install Dependencies
          </h4>
          <pre className='rounded bg-gray-100 p-2 text-sm'>
            <code>npm install pdf-parse</code>
          </pre>
        </div>

        <div className='rounded border bg-white p-4'>
          <h4 className='mb-2 font-medium text-gray-900'>
            3. Create API Route: app/api/extract-pdf/route.js
          </h4>
          <pre className='max-h-64 overflow-x-auto overflow-y-auto rounded bg-gray-100 p-2 text-xs'>
            <code>{apiRouteCode}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
