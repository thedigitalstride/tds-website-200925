'use client'

import React from 'react'

const BeforeLogin: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect to our custom Google OAuth endpoint
    window.location.href = '/api/auth/google'
  }

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0' }}>
          Welcome to the TDS CMS
        </p>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Log in to manage the TDS website
        </p>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        style={{
          width: '100%',
          padding: '12px 16px',
          marginBottom: '16px',
          backgroundColor: '#ffffff',
          border: '1px solid #dadce0',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#3c4043',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          transition: 'background-color 0.2s, border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f8f9fa'
          e.currentTarget.style.borderColor = '#c6c6c6'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff'
          e.currentTarget.style.borderColor = '#dadce0'
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Sign in with Google
      </button>

      {/* Divider - Comment out when email/password is hidden */}
      {/* 
      <div style={{
        position: 'relative',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: '#dadce0',
        }} />
        <span style={{
          position: 'relative',
          padding: '0 12px',
          backgroundColor: '#fff',
          fontSize: '12px',
          color: '#5f6368',
        }}>
          Or continue with email
        </span>
      </div>
      */}
    </div>
  )
}

export default BeforeLogin
