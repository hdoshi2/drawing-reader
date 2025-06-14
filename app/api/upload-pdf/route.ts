// app/api/upload-pdf/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

interface ApiResponse {
  message: string
  filename?: string
  originalName?: string
  size?: number
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await request.formData()
    const file: File | null = data.get('pdf') as unknown as File

    if (!file) {
      return NextResponse.json(
        {
          message: 'No file uploaded'
        },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        {
          message: 'Only PDF files are allowed'
        },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          message: 'File size must be less than 10MB'
        },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const filename = `${uniqueSuffix}-${file.name}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, buffer)

    return NextResponse.json(
      {
        message: 'PDF uploaded successfully',
        filename: filename,
        originalName: file.name,
        size: file.size
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        message: 'Upload failed. Please try again.'
      },
      { status: 500 }
    )
  }
}
