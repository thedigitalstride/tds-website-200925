'use client'

/**
 * Usage Stats Component
 * Displays AI usage statistics and cost tracking (placeholder for future implementation)
 */

import React from 'react'

export const UsageStats: React.FC = () => {
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
        AI Usage Statistics
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '6px',
            border: '1px solid #dee2e6',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>
            This Month
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>-</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>ALT Tags Generated</div>
        </div>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '6px',
            border: '1px solid #dee2e6',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>
            Estimated Cost
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>$0.00</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>This Month</div>
        </div>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '6px',
            border: '1px solid #dee2e6',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>
            Success Rate
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0' }}>-</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Successful Generations</div>
        </div>
      </div>
      <p style={{ margin: '1rem 0 0 0', fontSize: '0.875rem', color: '#999' }}>
        Usage tracking will be populated once ALT tag generation is enabled and images are
        uploaded. Enable &ldquo;Cost Tracking&rdquo; below to see detailed cost estimates.
      </p>
    </div>
  )
}

export default UsageStats
