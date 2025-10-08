'use client'

import { Squeeze as Hamburger } from 'hamburger-react'
import { Button as AriaButton } from 'react-aria-components'
import { cx } from '@/utils/cx'
import { useEffect, useState } from 'react'

export const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('#000000')

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

  // Get color from CSS variable and update on theme change
  useEffect(() => {
    const updateColor = () => {
      const isDarkMode = document.documentElement.classList.contains('dark-mode')
      const computedColor = getComputedStyle(document.documentElement)
        .getPropertyValue(isDarkMode ? '--color-fg-white' : '--color-fg-brand-primary')
        .trim()
      setColor(computedColor)
    }

    updateColor()

    // Watch for theme changes
    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
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
  )
}
