'use client'

import { Squeeze as Hamburger } from 'hamburger-react'
import { Button as AriaButton } from 'react-aria-components'
import { cx } from '@/utils/cx'
import { useEffect, useState, useRef } from 'react'
import { useTheme } from 'next-themes'

interface MobileMenuButtonProps {
  isOpen?: boolean
  onToggle?: () => void
}

export const MobileMenuButton = ({ isOpen = false, onToggle }: MobileMenuButtonProps) => {
  const [color, setColor] = useState('#031A43') // Default white
  const colorProbeRef = useRef<HTMLSpanElement>(null)
  const { resolvedTheme } = useTheme()


  // Update hamburger color based on theme
  useEffect(() => {
    const updateColor = () => {
      // Light mode: white hamburger on brand blue
      // Dark mode: brand blue hamburger on white
      setColor(resolvedTheme === 'dark' ? '#ffffff' : '#031A43')
    }

    updateColor()
  }, [resolvedTheme])

  return (
    <>
      {/* Invisible probe element to read computed color from --color-header-logo */}
      <span
        ref={colorProbeRef}
        className="pointer-events-none fixed opacity-0"
        style={{ color: 'var(--color-header-logo)' }}
        aria-hidden="true"
      />

      <AriaButton
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onPress={onToggle}
        className={({ isFocusVisible, isHovered }) =>
          cx(
            'ml-auto -mr-2 cursor-pointer rounded-lg md:hidden',
            isHovered && 'bg-primary_hover',
            isFocusVisible && 'outline-2 outline-offset-2 outline-focus-ring',
          )
        }
      >
        <Hamburger
          toggled={isOpen}
          size={24}
          duration={0.4}
          color={color}
          rounded
          label="Toggle menu"
          hideOutline={true}
        />
      </AriaButton>
    </>
  )
}
