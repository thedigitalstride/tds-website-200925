'use client'

/**
 * Future Features Placeholder Component
 * Displays information about upcoming AI features
 */

import React from 'react'

export const FutureFeaturesPlaceholder: React.FC = () => {
  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: 600 }}>
        Upcoming AI Features
      </h3>
      <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
        The following AI-powered features are currently in development and will be available soon:
      </p>
      <ul style={{ margin: '0', paddingLeft: '1.5rem', color: '#666' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Blog Post Generation:</strong> AI-assisted content creation with customizable
          tone and style
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Meta Description Optimization:</strong> Automatically generate SEO-optimized meta
          descriptions
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Content Summarization:</strong> Generate excerpts and summaries automatically
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Translation Services:</strong> Multi-language content generation
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Image Categorization:</strong> Auto-categorize and tag images
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Accessibility Audits:</strong> Identify and fix accessibility issues
        </li>
      </ul>
      <p style={{ margin: '1rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
        Your provider configuration and API key will work with all future features once they are
        released.
      </p>
    </div>
  )
}

export default FutureFeaturesPlaceholder
