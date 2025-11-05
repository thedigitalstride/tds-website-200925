'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/Icon'

interface IconData {
  id: string
  name: string
  label?: string
  category?: string
  description?: string
  keywords?: Array<{ keyword: string }>
  aiMetadata?: {
    enhanced?: boolean
    confidence?: number
  }
}

interface IconLibraryClientProps {
  icons: IconData[]
}

export default function IconLibraryClient({ icons }: IconLibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get unique categories
  const categories = ['all', ...new Set(icons.map(icon => icon.category).filter(Boolean))]

  // Filter icons based on search and category
  const filteredIcons = icons.filter(icon => {
    const matchesSearch = searchTerm === '' ||
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.keywords?.some(k => k.keyword.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Icon Library
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse all available icons in the system. Click on any icon name to copy it.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Total icons: {icons.length} | Showing: {filteredIcons.length}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {filteredIcons.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {icons.length === 0
                ? 'No icons found. Upload some icons to the Icons collection in the admin panel.'
                : 'No icons match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredIcons.map((icon) => (
              <IconCard key={icon.id} icon={icon} />
            ))}
          </div>
        )}

        {/* Test Section for question-mark icon */}
        <TestSection />
      </div>
    </div>
  )
}

function IconCard({ icon }: { icon: IconData }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(icon.name)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center gap-3"
      title={`Click to copy: ${icon.name}`}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon name={icon.name} size={32} />
      </div>
      <div className="w-full">
        <p className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">
          {icon.name}
        </p>
        {icon.category && (
          <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">
            {icon.category}
          </p>
        )}
      </div>
      {copied && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-90 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-medium">Copied!</span>
        </div>
      )}
      {/* AI Enhancement Indicator */}
      {icon.aiMetadata?.enhanced && (
        <div className="absolute top-1 right-1">
          <div
            className="w-2 h-2 bg-green-400 rounded-full"
            title={`AI Enhanced (${icon.aiMetadata.confidence || 0}% confidence)`}
          />
        </div>
      )}
    </button>
  )
}

function TestSection() {
  return (
    <div className="mt-16 border-t pt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Icon Test Section
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Testing the question-mark icon (if it exists):
        </p>

        {/* Size variations */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Size Variations</h3>
          <div className="flex items-end gap-8">
            <div className="text-center">
              <Icon name="question-mark" size="sm" className="mb-2" />
              <p className="text-xs text-gray-500">Small (16px)</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="md" className="mb-2" />
              <p className="text-xs text-gray-500">Medium (20px)</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="mb-2" />
              <p className="text-xs text-gray-500">Large (24px)</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="xl" className="mb-2" />
              <p className="text-xs text-gray-500">XL (32px)</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size={48} className="mb-2" />
              <p className="text-xs text-gray-500">Custom (48px)</p>
            </div>
          </div>
        </div>

        {/* Color variations */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Color Variations</h3>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-blue-500 mb-2" />
              <p className="text-xs text-gray-500">Blue</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-green-500 mb-2" />
              <p className="text-xs text-gray-500">Green</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-red-500 mb-2" />
              <p className="text-xs text-gray-500">Red</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-purple-500 mb-2" />
              <p className="text-xs text-gray-500">Purple</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-yellow-500 mb-2" />
              <p className="text-xs text-gray-500">Yellow</p>
            </div>
            <div className="text-center">
              <Icon name="question-mark" size="lg" className="text-gray-500 mb-2" />
              <p className="text-xs text-gray-500">Gray</p>
            </div>
          </div>
        </div>

        {/* Usage example */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded">
          <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2">Usage example:</p>
          <code className="text-xs text-gray-800 dark:text-gray-200">
            {`<Icon name="question-mark" size="lg" className="text-blue-500" />`}
          </code>
        </div>
      </div>
    </div>
  )
}