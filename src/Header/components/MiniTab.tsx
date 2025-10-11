'use client'
import { motion } from 'motion/react'
import { Squeeze as Hamburger } from 'hamburger-react'
import { Button } from '@/components/uui/button'

interface MiniTabProps {
  isVisible: boolean
  onShowHeader: () => void
  ctaButton?: {
    enabled: boolean
    link: {
      label?: string
      type: 'reference' | 'custom'
      reference?: { value: number | { slug?: string | null }; relationTo: string }
      url?: string
      newTab?: boolean
      uuiColor?: string
      uuiSize?: string
    }
  }
}

export function MiniTab({ isVisible, ctaButton, onShowHeader }: MiniTabProps) {
  const handleMenuClick = () => {
    // Reveal the full header at current scroll position
    onShowHeader()
  }

  // Render CTA button
  const renderCtaButton = () => {
    if (!ctaButton?.enabled || !ctaButton.link) {
      return (
        <Button color="secondary" size="md">
          ENQUIRE
        </Button>
      )
    }

    const linkData = ctaButton.link
    let href = '#'

    if (linkData.type === 'reference' && linkData.reference) {
      if (typeof linkData.reference === 'object' && 'slug' in linkData.reference) {
        href = `/${linkData.reference.slug}`
      }
    } else if (linkData.type === 'custom' && linkData.url) {
      href = linkData.url
    }

    const size = (linkData.uuiSize && ['sm', 'md', 'lg', 'xl'].includes(linkData.uuiSize))
      ? linkData.uuiSize as "sm" | "md" | "lg" | "xl"
      : "md"
    const color = (linkData.uuiColor && ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor))
      ? linkData.uuiColor as "primary" | "accent" | "secondary" | "tertiary" | "link"
      : "secondary"

    return (
      <Button
        color={color}
        size={size}
        href={href}
        {...(linkData.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {linkData.label || 'ENQUIRE'}
      </Button>
    )
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 hidden md:block"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        // Fixed position doesn't affect layout - zero CLS
        willChange: isVisible ? 'transform' : 'auto',
      }}
    >
      <div className="mx-auto max-w-container px-8">
        <div className="bg-brand-solid text-white rounded-b-2xl shadow-lg ml-auto w-fit">
          <div className="flex items-center gap-3 px-4 py-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={handleMenuClick}
              aria-label="Show navigation menu"
              className="flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors -ml-2"
            >
              <Hamburger
                toggled={false}
                size={24}
                duration={0}
                color="#ffffff"
                rounded
                label="Show menu"
                hideOutline={true}
              />
            </button>

            {/* CTA Button */}
            <div className="hidden md:block">
              {renderCtaButton()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
