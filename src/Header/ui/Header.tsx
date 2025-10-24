'use client'

import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from '@untitledui/icons'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/uui/button'
import { TDSLogo } from '@/components/Logo/tds-logo'
import { cx } from '@/utils/cx'
import Link from 'next/link'
import { MobileMenuButton } from '../components/MobileMenuButton'
import { getIcon } from '../utils/IconMap'

type HeaderNavItem = {
  label: string
  href?: string
  menu?: ReactNode
}

// Default nav items (empty - will be populated from CMS)
const defaultNavItems: HeaderNavItem[] = []

const DesktopNavItem = (props: {
  label: string
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <button
      aria-expanded={props.isOpen}
      aria-haspopup="true"
      onClick={props.onToggle}
      className={cx(
        "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
        "dark:text-white text-brand-500 hover:underline underline-offset-4"
      )}
    >
      <span className="px-0.5">{props.label}</span>
      <ChevronDown className={cx(
        "size-5 stroke-[2.625px] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "dark:text-white text-brand-500",
        props.isOpen ? 'rotate-0' : '-rotate-90'
      )} />
    </button>
  )
}


const MobileNavItem = (props: {
  className?: string
  label: string
  href?: string
  children?: ReactNode
  isMenuOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Close submenu when main menu closes
  useEffect(() => {
    if (!props.isMenuOpen) {
      setIsOpen(false)
    }
  }, [props.isMenuOpen])

  if (props.href) {
    return (
      <a
        href={props.href}
        className={cx(
          "flex items-center justify-between px-4 py-2 text-md font-semibold",
          "dark:text-white text-brand-500"
        )}
      >
        {props.label}
      </a>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      <button
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cx(
          "flex w-full items-center justify-between px-4 py-2 text-md font-semibold",
          "dark:text-white text-brand-500"
        )}
      >
        {props.label}{' '}
        <ChevronDown
          className={cx(
            'size-5 stroke-[2.625px] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            "dark:text-white text-brand-500",
            isOpen ? 'rotate-0' : '-rotate-90',
          )}
        />
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="mobile-submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface HeaderProps {
  items?: HeaderNavItem[]
  isFullWidth?: boolean
  isFloating?: boolean
  className?: string
  logoVariant?: 'auto' | 'dark' | 'light'
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
      buttonIcon?: string
      iconPos?: string
    }
  }
  mobileCtaButton?: {
    enabled: boolean
    link: {
      label?: string
      type: 'reference' | 'custom'
      reference?: { value: number | { slug?: string | null }; relationTo: string }
      url?: string
      newTab?: boolean
      uuiColor?: string
      uuiSize?: string
      buttonIcon?: string
      iconPos?: string
    }
  }
}

export const Header = ({
  items = defaultNavItems,
  isFullWidth: _isFullWidth,
  isFloating,
  className,
  logoVariant = 'auto',
  ctaButton,
  mobileCtaButton,
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDesktopMenuLabel, setOpenDesktopMenuLabel] = useState<string | null>(null)

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDesktopMenuLabel(null)
      }
    }

    if (openDesktopMenuLabel) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDesktopMenuLabel])

  // Helper function to render CTA button
  const renderCtaButton = (sizeProp?: 'sm' | 'md' | 'lg' | 'xl') => {
    const defaultSize = sizeProp || (isFloating ? 'md' : 'lg')

    if (!ctaButton?.enabled || !ctaButton.link) {
      // Default fallback
      return (
        <Button color="secondary" size={defaultSize}>
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

    const size =
      linkData.uuiSize && ['sm', 'md', 'lg', 'xl'].includes(linkData.uuiSize)
        ? (linkData.uuiSize as 'sm' | 'md' | 'lg' | 'xl')
        : defaultSize
    const color =
      linkData.uuiColor &&
      ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor)
        ? (linkData.uuiColor as 'primary' | 'accent' | 'secondary' | 'tertiary' | 'link')
        : 'secondary'

    // Get icon component if specified
    const IconComponent = linkData.buttonIcon ? getIcon(linkData.buttonIcon) : null
    const iconPosition = linkData.iconPos || 'trailing'

    return (
      <Button
        color={color}
        size={size}
        href={href}
        iconLeading={iconPosition === 'leading' ? IconComponent : undefined}
        iconTrailing={iconPosition === 'trailing' ? IconComponent : undefined}
        {...(linkData.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {linkData.label || 'ENQUIRE'}
      </Button>
    )
  }

  // Helper function to render mobile CTA button
  const renderMobileCtaButton = () => {
    // Determine which CTA config to use
    const effectiveCta = mobileCtaButton?.enabled ? mobileCtaButton : ctaButton

    // If no CTA is enabled, don't render anything
    if (!effectiveCta?.enabled || !effectiveCta.link) {
      return null
    }

    const linkData = effectiveCta.link
    let href = '#'

    if (linkData.type === 'reference' && linkData.reference) {
      if (typeof linkData.reference === 'object' && 'slug' in linkData.reference) {
        href = `/${linkData.reference.slug}`
      }
    } else if (linkData.type === 'custom' && linkData.url) {
      href = linkData.url
    }

    const size =
      linkData.uuiSize && ['sm', 'md', 'lg', 'xl'].includes(linkData.uuiSize)
        ? (linkData.uuiSize as 'sm' | 'md' | 'lg' | 'xl')
        : 'sm' // Default to small for mobile
    const color =
      linkData.uuiColor &&
      ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor)
        ? (linkData.uuiColor as 'primary' | 'accent' | 'secondary' | 'tertiary' | 'link')
        : 'secondary'

    // Get icon component if specified
    const IconComponent = linkData.buttonIcon ? getIcon(linkData.buttonIcon) : null
    const iconPosition = linkData.iconPos || 'trailing'

    return (
      <Button
        color={color}
        size={size}
        href={href}
        iconLeading={iconPosition === 'leading' ? IconComponent : undefined}
        iconTrailing={iconPosition === 'trailing' ? IconComponent : undefined}
        {...(linkData.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {linkData.label || 'ENQUIRE'}
      </Button>
    )
  }

  return (
    <div
      ref={headerRef}
      className={cx(
        'relative w-full',
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex h-14 w-full items-center px-4 py-1 md:h-17 md:px-5 md:py-2">
        <div
          className={cx(
            'w-full flex items-center justify-between',
            isFloating && 'md:rounded-lg md:py-3 md:pr-3 md:pl-4',
          )}
        >
          {/* Logo Section */}
          <div className="flex items-center whitespace-nowrap" suppressHydrationWarning>
            <Link href="/" className="flex items-center dark:text-white text-brand-500">
              <TDSLogo variant={logoVariant} size="xl" className="hidden h-11 lg:inline-block" />
              <TDSLogo
                variant={logoVariant}
                size="lg"
                className="hidden h-9 md:inline-block lg:hidden"
              />
              <TDSLogo variant={logoVariant} size="md" className="h-7.5 md:hidden" />
            </Link>
          </div>

          {/* Mobile CTA - centered in mobile header */}
          <div className="flex flex-1 items-center justify-center md:hidden">
            {renderMobileCtaButton()}
          </div>

          {/* Desktop Navigation */}
          <nav className="max-md:hidden flex-1 md:flex md:justify-center" suppressHydrationWarning>
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {items.map((navItem) => (
                <li key={navItem.label}>
                  {navItem.menu ? (
                    <DesktopNavItem
                      label={navItem.label}
                      isOpen={openDesktopMenuLabel === navItem.label}
                      onToggle={() =>
                        setOpenDesktopMenuLabel(
                          openDesktopMenuLabel === navItem.label ? null : navItem.label,
                        )
                      }
                    />
                  ) : (
                    <a
                      href={navItem.href}
                      className={cx(
                        "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold outline-focus-ring transition duration-100 ease-linear focus:outline-offset-2 focus-visible:outline-2",
                        "dark:text-white text-brand-500 hover:underline underline-offset-4"
                      )}
                    >
                      <span className="px-0.5">{navItem.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA and Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA - shows on desktop only */}
            <div className="hidden items-center gap-3 md:flex">{renderCtaButton()}</div>

            {/* Mobile menu button */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu content - renders inline below header bar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }
            }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }}
            className="md:hidden w-full overflow-hidden"
          >
            <div className="py-3 overflow-y-auto scrollbar-hide max-h-[calc(100vh-10rem)]">
              <motion.ul
                className="flex flex-col gap-0.5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0
                    }
                  },
                  hidden: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                {items.map((navItem) =>
                  navItem.menu ? (
                    <motion.li
                      key={navItem.label}
                      variants={{
                        hidden: { opacity: 0, y: -32 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <MobileNavItem
                        label={navItem.label}
                        isMenuOpen={isMobileMenuOpen}
                      >
                        {navItem.menu}
                      </MobileNavItem>
                    </motion.li>
                  ) : (
                    <motion.li
                      key={navItem.label}
                      variants={{
                        hidden: { opacity: 0, y: -32 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    >
                      <MobileNavItem
                        label={navItem.label}
                        href={navItem.href}
                        isMenuOpen={isMobileMenuOpen}
                      />
                    </motion.li>
                  )
                )}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop dropdown content - renders inline below header bar */}
      <AnimatePresence mode="wait">
        {openDesktopMenuLabel && (
          <motion.div
            key={openDesktopMenuLabel}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }
            }}
            transition={{
              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }}
            className="max-md:hidden w-full overflow-hidden"
          >
            {items.find((item) => item.label === openDesktopMenuLabel)?.menu}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
