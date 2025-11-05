'use client'

import React, { useState, useEffect, useMemo } from 'react'
import type { Icon } from '@/payload-types'

interface IconGridProps {
  selectedIconId?: string
  onSelect: (iconId: string) => void
}

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'action', label: 'Action' },
  { value: 'social', label: 'Social' },
  { value: 'communication', label: 'Communication' },
  { value: 'interface', label: 'Interface' },
  { value: 'file', label: 'File' },
  { value: 'device', label: 'Device' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'media', label: 'Media' },
  { value: 'custom', label: 'Custom' },
]

export const IconGrid: React.FC<IconGridProps> = ({ selectedIconId, onSelect }) => {
  const [icons, setIcons] = useState<Icon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  // Fetch icons from Payload API
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch('/api/icons?limit=1000&depth=0')
        const data = await response.json()
        setIcons(data.docs || [])
      } catch (error) {
        console.error('Error fetching icons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIcons()
  }, [])

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return icons.filter((icon) => {
      // Category filter
      if (categoryFilter && icon.category !== categoryFilter) {
        return false
      }

      // Search filter (searches name, label, description, keywords)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesName = icon.name?.toLowerCase().includes(searchLower)
        const matchesLabel = icon.label?.toLowerCase().includes(searchLower)
        const matchesDescription = icon.description?.toLowerCase().includes(searchLower)
        const matchesKeywords = icon.keywords?.some((kw) =>
          kw.keyword?.toLowerCase().includes(searchLower),
        )

        return matchesName || matchesLabel || matchesDescription || matchesKeywords
      }

      return true
    })
  }, [icons, searchTerm, categoryFilter])

  if (loading) {
    return <div className="p-4">Loading icons...</div>
  }

  if (icons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No icons available. Upload icons to the Icons collection first.
      </div>
    )
  }

  return (
    <div className="icon-selector-component">
      {/* Search and Filter Bar */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search icons by name, keyword, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="mb-3 text-sm text-gray-600">
        {filteredIcons.length} {filteredIcons.length === 1 ? 'icon' : 'icons'} found
      </div>

      {/* Icon Grid */}
      <div className="grid max-h-96 grid-cols-6 gap-3 overflow-y-auto rounded-md border border-gray-200 p-4">
        {filteredIcons.length === 0 ? (
          <div className="col-span-6 py-8 text-center text-gray-500">
            No icons match your search criteria
          </div>
        ) : (
          filteredIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => onSelect(String(icon.id))}
              className={`flex aspect-square flex-col items-center justify-center rounded-md border p-3 transition-all hover:border-blue-500 hover:bg-blue-50 ${
                selectedIconId === String(icon.id)
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200'
              }`}
              title={icon.label || icon.name}
              type="button"
            >
              <div
                className="h-8 w-8 text-gray-700"
                dangerouslySetInnerHTML={{ __html: icon.svgCode || '' }}
              />
              <div className="mt-1 truncate text-xs text-gray-600">{icon.name}</div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
