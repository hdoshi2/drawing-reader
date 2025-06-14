import pdf from 'pdf-parse';
import { NextResponse } from 'next/server';

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
  return NextResponse.json({ message: 'PDF extraction API - POST only' }, { status: 405 });
}