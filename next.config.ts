import type { NextConfig } from 'next'

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse']
  },
  // For App Router, use this format:
  serverActions: {
    bodySizeLimit: '30mb'
  }
}

module.exports = nextConfig
