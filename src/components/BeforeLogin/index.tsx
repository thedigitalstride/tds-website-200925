import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center' }}>
      <p style={{ textAlign: 'center'}}>
        <b>Welcome to the TDS CMS</b>
        {' Log in to manage the TDS website.'}
      </p>
    </div>
  )
}

export default BeforeLogin
