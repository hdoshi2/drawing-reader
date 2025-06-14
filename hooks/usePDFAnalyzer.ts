// hooks/usePDFAnalyzer.ts
import { useState, useCallback } from 'react'

type AIProvider = 'gemini' | 'claude'

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
  aiProvider?: AIProvider
}

interface UsePDFAnalyzerReturn {
  extractConstructionData: (
    text: string,
    provider?: AIProvider
  ) => Promise<void>
  loading: boolean
  error: string | null
  successMessage: string | null
  constructionData: ConstructionDataResult | null
  selectedProvider: AIProvider
  setSelectedProvider: (provider: AIProvider) => void
}

const validateConstructionData = (
  data: any
): data is ConstructionDataResult => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.summary === 'string' &&
    typeof data.totalItemsFound === 'number' &&
    Array.isArray(data.extractedItems) &&
    typeof data.documentType === 'string' &&
    Array.isArray(data.recommendations) &&
    data.extractedItems.every(
      (item: any) =>
        typeof item === 'object' &&
        typeof item.itemType === 'string' &&
        typeof item.quantity === 'string' &&
        typeof item.modelNumber === 'string' &&
        typeof item.specReference === 'string' &&
        typeof item.pageReference === 'string' &&
        typeof item.dimensions === 'string' &&
        typeof item.mountingType === 'string' &&
        typeof item.additionalNotes === 'string'
    ) &&
    data.recommendations.every((item: any) => typeof item === 'string')
  )
}

export const usePDFAnalyzer = (): UsePDFAnalyzerReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [constructionData, setConstructionData] =
    useState<ConstructionDataResult | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('claude')

  const getApiEndpoint = (provider: AIProvider): string => {
    return provider === 'claude' ? '/api/askClaude' : '/api/askGemini'
  }

  const getProviderDisplayName = (provider: AIProvider): string => {
    return provider === 'claude' ? 'Claude' : 'Gemini'
  }

  const createClaudePrompt = (text: string): string => {
    return `You are a construction data extraction specialist. I need you to analyze PDF text content and extract structured construction data.

<document_text>
${text}
</document_text>

<task>
Extract ALL construction items, fixtures, and equipment from the document above. This may include:
- Mechanical equipment (HVAC, pumps, boilers, etc.)
- Electrical components (conduit, fixtures, panels, etc.) 
- Plumbing fixtures and piping
- Fire protection systems
- Building materials and components
- Any item with specifications, quantities, or model numbers
</task>

<output_format>
You must return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. Use this exact structure:

{
  "summary": "Brief description of document type and key findings (max 200 chars)",
  "totalItemsFound": 0,
  "documentType": "Type of document (e.g. Equipment Schedule, Mechanical Plans, etc.)",
  "extractedItems": [
    {
      "itemType": "Category (e.g. HVAC Equipment, Electrical Conduit, Plumbing Fixtures)",
      "quantity": "Amount with units (e.g. 2 EA, 100 LF) or N/A",
      "modelNumber": "Model/part number or N/A",
      "specReference": "Specification section/reference or N/A",
      "pageReference": "Page/drawing reference or N/A", 
      "dimensions": "Size/capacity with units or N/A",
      "mountingType": "Installation method or N/A",
      "additionalNotes": "Material, finish, special requirements or N/A"
    }
  ],
  "recommendations": [
    "Actionable recommendation for construction team",
    "Procurement or scheduling suggestion",
    "Quality control or coordination note"
  ]
}
</output_format>

<extraction_rules>
1. Use "N/A" for any missing information - never use null, empty strings, or undefined
2. Keep all text values simple and avoid special characters that could break JSON
3. Extract up to 75 most important items to prevent response truncation
4. Ensure totalItemsFound matches the length of extractedItems array
5. Look for items in tables, schedules, specifications, and annotations
6. Preserve original units for quantities (EA, LF, SF, GPM, CFM, etc.)
7. Include voltage, pressure, temperature ratings in dimensions field
8. Focus on actionable recommendations for construction professionals
9. Don't group any extracted items, provide a complete list even if they are the same model
</extraction_rules>

Return only the JSON object with no other text.`
  }

  const createGeminiPrompt = (text: string): string => {
    return `You are a construction data extraction specialist. Analyze the following PDF drawing set content which may contain technical drawings, schedules, cut sheets, specifications, or construction documents.

Extract ALL relevant construction items/fixtures/equipment mentioned in the document. Look for:

Text content:
${text}

CRITICAL JSON FORMATTING RULES:
1. Return ONLY valid JSON - no markdown, no extra text, no explanations
2. Use double quotes for all strings
3. Escape any quotes inside strings with \"
4. Keep all text values clean and simple
5. If you encounter special characters, replace them with simple alternatives
6. Ensure all JSON brackets and braces are properly closed
7. Do not include line breaks within string values
8. Maximum 75 items to prevent response truncation

Return the results in this EXACT JSON format:

{
  "summary": "Brief description of document type and findings (keep under 200 characters)",
  "totalItemsFound": 0,
  "documentType": "Document type (e.g. Mechanical Schedule, Electrical Plan, etc.)",
  "extractedItems": [
    {
      "itemType": "Category (e.g. Pipe & Fittings, Ductwork, Electrical Conduit, etc.)",
      "quantity": "Number with units (e.g. 12 EA, 50 LF) or N/A",
      "modelNumber": "Model/part number or N/A",
      "specReference": "Specification reference or N/A", 
      "pageReference": "Page/sheet or DRAWING NUMBER reference or N/A",
      "dimensions": "Physical dimensions with units or N/A",
      "mountingType": "Installation method or N/A",
      "additionalNotes": "Other relevant details or N/A"
    }
  ],
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2", 
    "Actionable recommendation 3"
  ]
}

EXTRACTION GUIDELINES:
- Don't group any extracted items, provide a complete list of items even if they are the same model or part 
- Extract EVERY identifiable construction item, fixture, or equipment
- Use "N/A" for missing information - never leave fields empty or null
- Keep string values simple and avoid special characters
- Focus on construction/building trades: mechanical, electrical, plumbing, fire protection
- Include quantities with original units (EA, LF, SF, etc.)
- Limit to 75 items if document is very large
- Ensure totalItemsFound matches extractedItems array length

Return ONLY the JSON object - no additional text or formatting.`
  }

  const cleanInputText = (text: string): string => {
    return text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ')
      .replace(/[""'']/g, '"')
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s{3,}/g, ' ')
      .trim()
  }

  const truncateText = (text: string, maxLength: number = 50000): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '\n[Text truncated for processing]'
  }

  const cleanJsonResponse = (response: string): string => {
    return response
      .trim()
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/^\s*[\r\n]/gm, '')
      .trim()
  }

  const parseJsonWithFallbacks = (
    jsonString: string,
    providerName: string
  ): ConstructionDataResult => {
    const attempts = [
      // Direct parse
      () => JSON.parse(jsonString),

      // Extract JSON object
      () => {
        const match = jsonString.match(/\{[\s\S]*\}/)
        if (!match) throw new Error('No JSON object found')
        return JSON.parse(match[0])
      },

      // Fix common issues
      () => {
        let fixed = jsonString
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\\"/g, '"')
          .replace(/"([^"]+)":/g, '"$1":')
        return JSON.parse(fixed)
      },

      // Repair truncated JSON
      () => {
        let repaired = jsonString
        const openBraces = (repaired.match(/\{/g) || []).length
        const closeBraces = (repaired.match(/\}/g) || []).length

        if (openBraces > closeBraces) {
          repaired += '}'.repeat(openBraces - closeBraces)
        }

        if (repaired.endsWith('"') || repaired.match(/"[^"]*$/)) {
          repaired = repaired.replace(/"[^"]*$/, '""')
        }

        return JSON.parse(repaired)
      },

      // Fallback structure
      () => ({
        summary: `Failed to parse complete ${providerName} response. Please try again with a different document.`,
        totalItemsFound: 0,
        documentType: 'Unknown',
        extractedItems: [],
        recommendations: [
          `Unable to parse ${providerName} response - please try again`,
          'Consider using a different PDF with clearer text',
          'Check if document contains structured construction data'
        ]
      })
    ]

    for (let i = 0; i < attempts.length; i++) {
      try {
        const result = attempts[i]()
        if (i > 0) {
          console.warn(
            `${providerName} JSON parsed using fallback strategy ${i + 1}`
          )
        }
        return result
      } catch (attemptError) {
        if (i === attempts.length - 1) {
          return attempts[i]() // Last attempt should always succeed
        }
        console.warn(
          `${providerName} parse attempt ${i + 1} failed:`,
          attemptError
        )
      }
    }

    // This should never be reached, but TypeScript needs it
    throw new Error(`All parse attempts failed for ${providerName}`)
  }

  const extractConstructionData = useCallback(
    async (text: string, provider?: AIProvider): Promise<void> => {
      if (!text || text.trim().length === 0) {
        setError(
          'No text available for analysis. Please extract text from a PDF first.'
        )
        return
      }

      const aiProvider = provider || selectedProvider
      const apiEndpoint = getApiEndpoint(aiProvider)
      const providerName = getProviderDisplayName(aiProvider)

      setLoading(true)
      setError(null)
      setSuccessMessage(null)

      try {
        // Clean and prepare text
        const cleanedText = cleanInputText(text)
        const processedText = truncateText(cleanedText)

        // Create provider-specific prompt
        const prompt =
          aiProvider === 'claude'
            ? createClaudePrompt(processedText)
            : createGeminiPrompt(processedText)

        // Make API call
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: prompt })
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`API Error (${response.status}): ${errorText}`)
        }

        const data = await response.json()
        if (!data.answer) {
          throw new Error('No answer received from API')
        }

        // Clean and parse JSON response
        const cleanedResponse = cleanJsonResponse(data.answer)
        const parsedResult = parseJsonWithFallbacks(
          cleanedResponse,
          providerName
        )

        // Add provider info and validate
        parsedResult.aiProvider = aiProvider

        if (!validateConstructionData(parsedResult)) {
          throw new Error(
            `Generated construction data from ${providerName} failed validation. Please try again.`
          )
        }

        setConstructionData(parsedResult)
        setSuccessMessage(
          `✅ Successfully extracted ${parsedResult.totalItemsFound} construction items using ${providerName}!`
        )

        setTimeout(() => setSuccessMessage(null), 3000)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : `Unknown error occurred with ${providerName}.`
        setError(errorMessage)
        console.error(
          `${providerName} construction data extraction error:`,
          err
        )
      } finally {
        setLoading(false)
      }
    },
    [selectedProvider]
  )

  return {
    extractConstructionData,
    loading,
    error,
    successMessage,
    constructionData,
    selectedProvider,
    setSelectedProvider
  }
}
