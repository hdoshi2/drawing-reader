# PDF Construction Data Extractor 🏗️📄

This application is an AI-powered construction document analysis tool that extracts structured data from technical PDFs including equipment schedules, specifications, cut sheets, and construction drawings. The system converts unstructured PDF content into actionable construction data for project teams.

## 🔍 Purpose

The application demonstrates how AI can transform construction document workflows by automatically extracting critical project information such as:

- Equipment types, quantities, and specifications
- Model numbers and part references
- Dimensions, mounting details, and installation requirements
- Page references and specification sections

This streamlines construction procurement, scheduling, and project coordination by eliminating manual data extraction from technical documents.

---

## 🧠 LLM Integration

The app supports **dual AI providers** with flexible API switching:

### **Claude API** (Recommended - More Detailed & Reliable)
- Uses **Claude 3.5 Sonnet** via `/api/askClaude` endpoint
- Superior instruction-following for consistent JSON output
- Better understanding of technical construction terminology
- More reliable structured data extraction with fewer parsing errors

### **Gemini API** (Alternative Option)
- Uses **Gemini 1.5 Flash** via `/api/askGemini` endpoint  
- Faster processing for simpler documents
- Cost-effective for high-volume processing

**Key Finding**: Claude consistently provides more detailed and accurate construction data extraction, making it the preferred choice for complex technical documents.

---

## ✨ Features

- 📄 **PDF Text Extraction**: Upload and extract text from construction PDFs
- 🔍 **Intelligent Document Analysis**: Auto-detects document types (schedules, plans, specifications)
- 🏗️ **Construction Data Extraction**: Identifies equipment, quantities, models, dimensions, mounting details
- 📊 **Professional Data Display**: Color-coded categories, structured tables, detailed item cards
- 💾 **Persistent Storage**: localStorage integration for seamless user experience
- 🎯 **Export Capabilities**: CSV, material lists, and procurement reports
- 📱 **Responsive Design**: Works across desktop and mobile devices

---

## 📦 Tech Stack

- **React** with custom hooks and TypeScript
- **Next.js** with App Router and API routes
- **Tailwind CSS** for professional construction industry styling
- **PDF-Parse** for server-side PDF text extraction
- **Claude/Gemini APIs** for AI-powered data extraction
- **Lucide Icons** for construction-themed iconography
- **localStorage** for persistent data management

---

## 🔧 Component Architecture

### **Modular Design**
- `usePDFUpload` - PDF upload and text extraction logic
- `usePDFTextStorage` - localStorage management for extracted content
- `usePDFAnalyzer` - AI-powered construction data extraction
- `ConstructionDataDisplay` - Professional data visualization
- `FileUploadZone` - Drag-and-drop PDF interface

### **Construction-Focused UX**
- Industry-appropriate color coding (blue=plumbing, yellow=electrical, green=HVAC)
- Professional loading states with construction-themed skeletons
- Detailed error handling with troubleshooting guidance
- Export options tailored for construction workflows

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd pdf-construction-extractor
npm install
```

### 2. **Install Dependencies**
```bash
npm install pdf-parse
```

### 3. **Configure AI API Keys**

Create a `.env.local` file in your project root:

```bash
# For Claude (Recommended)
CLAUDE_API_KEY=sk-ant-api03-your-key-here

# For Gemini (Alternative)
GEMINI_API_KEY=your-gemini-key-here
```

### 4. **Set Up API Routes**

Create the following API route files:

#### **Claude API Route** (`app/api/askClaude/route.js`)
```javascript
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { question } = await req.json();
  const apiKey = process.env.CLAUDE_API_KEY;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      temperature: 0.1,
      messages: [{ role: 'user', content: question }]
    })
  });

  const data = await response.json();
  return NextResponse.json({ answer: data.content[0].text });
}
```

#### **PDF Extraction API Route** (`app/api/extract-pdf/route.js`)
```javascript
import pdf from 'pdf-parse';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('pdf');
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const data = await pdf(buffer);
  
  return NextResponse.json({ 
    text: data.text,
    pages: data.numpages 
  });
}
```

### 5. **Configure Next.js**

Update your `next.config.js`:

```javascript
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
```

### 6. **Run the Application**
```bash
npm run dev
```

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # PDF upload page
│   ├── analyze/page.tsx            # Construction data analysis page
│   └── api/
│       ├── askClaude/route.js      # Claude API endpoint
│       ├── askGemini/route.js      # Gemini API endpoint
│       └── extract-pdf/route.js    # PDF text extraction
├── components/
│   ├── FileUploadZone.tsx          # PDF upload interface
│   ├── ConstructionDataDisplay.tsx # Data visualization
│   ├── ConstructionDataSkeleton.tsx # Loading states
│   ├── ConstructionStatusMessages.tsx # Error/success handling
│   └── ConstructionDocumentPreview.tsx # Document preview
├── hooks/
│   ├── usePDFUpload.ts            # PDF upload logic
│   ├── usePDFTextStorage.ts       # localStorage management
│   └── usePDFAnalyzer.ts          # AI data extraction
└── types/
    └── construction.ts             # TypeScript interfaces
```

---

## 💰 Cost Analysis

### **Claude API** (Recommended)
- **Input**: ~$3 per million tokens
- **Output**: ~$15 per million tokens
- **Typical cost per extraction**: $0.01-0.05
- Higher accuracy and detail justify the cost

### **Gemini API** (Budget Option)
- **Input**: ~$0.50 per million tokens  
- **Output**: ~$1.50 per million tokens
- **Typical cost per extraction**: $0.001-0.01
- Good for high-volume, simpler documents

---

## 🎯 Construction Industry Impact

This tool addresses critical pain points in construction project management:

- **Eliminates manual data entry** from technical documents
- **Reduces procurement errors** through structured data extraction
- **Accelerates project scheduling** with automated quantity takeoffs
- **Improves coordination** between trades through standardized data
- **Enhances quality control** with consistent specification tracking