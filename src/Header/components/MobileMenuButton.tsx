'use client'

import { Squeeze as Hamburger } from 'hamburger-react'
import { Button as AriaButton } from 'react-aria-components'
import { cx } from '@/utils/cx'
import { useEffect, useState, useRef } from 'react'

export const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('#031a43') // Default dark blue
  const colorProbeRef = useRef<HTMLSpanElement>(null)

  // Sync hamburger state with aria-expanded attribute
  useEffect(() => {
    const button = document.querySelector('[aria-label="Toggle navigation menu"]')
    if (!button) return

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'aria-expanded') {
          const expanded = button.getAttribute('aria-expanded') === 'true'
          setIsOpen(expanded)
        }
      })
    })

    observer.observe(button, { attributes: true })
    return () => observer.disconnect()
  }, [])

  // Read color from invisible probe element that uses the same CSS variable as logo
  useEffect(() => {
    const updateColor = () => {
      if (!colorProbeRef.current) return

      // Always use white for hamburger icon on brand blue header
      setColor('#ffffff')
    }

    // Initial update
    updateColor()

    // Small delay to ensure CSS is loaded
    const timer = setTimeout(updateColor, 100)

    // Watch for changes to the probe element's computed style
    // This will catch CSS variable changes from any source
    const observer = new MutationObserver(updateColor)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-page-header', 'data-scrolled-header', 'data-header-scrolled'],
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [isOpen])

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
        className={({ isFocusVisible, isHovered }) =>
          cx(
            'ml-auto cursor-pointer rounded-lg md:hidden -mr-2',
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
