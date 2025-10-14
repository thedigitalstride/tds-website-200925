'use client'

import type { ReactNode } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from '@untitledui/icons'
import { motion, AnimatePresence } from 'motion/react'
import {
  Button as AriaButton,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
} from 'react-aria-components'
import { Button } from '@/components/uui/button'
import { TDSLogo } from '@/components/Logo/tds-logo'
import { cx } from '@/utils/cx'
import Link from 'next/link'
import { DropdownMenuFeatureCard } from './dropdown-menu-feature-card'
import { DropdownMenuSimpleWithFooter } from './dropdown-menu-simple-with-footer'
import { DropdownMenuWithTwoColsAndLinksAndFooter } from './dropdown-menu-with-two-cols-and-links-and-footer'
import { MobileMenuButton } from '../components/MobileMenuButton'

type HeaderNavItem = {
  label: string
  href?: string
  menu?: ReactNode
}

const headerNavItems: HeaderNavItem[] = [
  { label: 'Products', href: '/products', menu: <DropdownMenuSimpleWithFooter /> },
  { label: 'Services', href: '/Services', menu: <DropdownMenuFeatureCard /> },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources', menu: <DropdownMenuWithTwoColsAndLinksAndFooter /> },
  { label: 'About', href: '/about' },
]


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
      <li>
        <a
          href={props.href}
          className={cx(
            "flex items-center justify-between px-4 py-3 text-md font-semibold",
            "text-white hover:bg-brand-600 dark:text-brand-500 dark:hover:bg-gray-100"
          )}
        >
          {props.label}
        </a>
      </li>
    )
  }

  return (
    <li className="flex flex-col gap-0.5">
      <button
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cx(
          "flex w-full items-center justify-between px-4 py-3 text-md font-semibold",
          "text-white hover:bg-brand-600 dark:text-brand-500 dark:hover:bg-gray-100"
        )}
      >
        {props.label}{' '}
        <ChevronDown
          className={cx(
            'size-4 stroke-[2.625px] transition duration-100 ease-linear',
            "text-white dark:text-brand-500",
            isOpen ? '-rotate-180' : 'rotate-0',
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
    </li>
  )
}

const MobileFooter = ({ ctaButton }: { ctaButton?: HeaderProps['ctaButton'] }) => {
  // Only show the footer if CTA button is enabled
  if (!ctaButton?.enabled || !ctaButton.link) {
    return null
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
      : 'lg'
  const color =
    linkData.uuiColor &&
    ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor)
      ? (linkData.uuiColor as 'primary' | 'accent' | 'secondary' | 'tertiary' | 'link')
      : 'secondary'

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-3">
        <Button
          color={color}
          size={size}
          href={href}
          {...(linkData.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {linkData.label || 'ENQUIRE'}
        </Button>
      </div>
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
    }
  }
}

export const Header = ({
  items = headerNavItems,
  isFullWidth: _isFullWidth,
  isFloating,
  className,
  logoVariant = 'auto',
  ctaButton,
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

    return (
      <Button
        color={color}
        size={size}
        href={href}
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
      <div className="flex h-16 w-full items-center px-4 py-2 md:h-17 md:px-5 md:py-2.5">
        <div
          className={cx(
            'w-full flex items-center justify-between',
            isFloating && 'md:rounded-lg md:py-3 md:pr-3 md:pl-4',
          )}
        >
          {/* Logo Section */}
          <div className="flex items-center whitespace-nowrap" suppressHydrationWarning>
            <Link href="/" className="flex items-center text-white dark:text-brand-500">
              <TDSLogo variant={logoVariant} size="xl" className="hidden h-11 lg:inline-block" />
              <TDSLogo
                variant={logoVariant}
                size="lg"
                className="hidden h-9 md:inline-block lg:hidden"
              />
              <TDSLogo variant={logoVariant} size="md" className="h-7.5 md:hidden" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="max-md:hidden flex-1 md:flex md:justify-center" suppressHydrationWarning>
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {items.map((navItem) => (
                <li key={navItem.label}>
                  {navItem.menu ? (
                    <AriaDialogTrigger>
                      <AriaButton className={cx(
                        "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
                        "text-white hover:text-gray-100 dark:text-brand-500 dark:hover:text-brand-600"
                      )}>
                        <span className="px-0.5">{navItem.label}</span>

                        <ChevronDown className={cx(
                          "size-4 rotate-0 stroke-[2.625px] transition duration-100 ease-linear in-aria-expanded:-rotate-180",
                          "text-white dark:text-brand-500"
                        )} />
                      </AriaButton>

                      <AriaPopover
                        className="hidden origin-top will-change-transform md:block"
                        offset={0}
                        containerPadding={32}
                        placement="bottom"
                        shouldFlip={false}
                      >
                        <AriaDialog className="origin-top outline-hidden w-full">
                          {navItem.menu}
                        </AriaDialog>
                      </AriaPopover>
                    </AriaDialogTrigger>
                  ) : (
                    <a
                      href={navItem.href}
                      className={cx(
                        "flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold outline-focus-ring transition duration-100 ease-linear focus:outline-offset-2 focus-visible:outline-2",
                        "text-white hover:text-gray-100 dark:text-brand-500 dark:hover:text-brand-600"
                      )}
                    >
                      <span className="px-0.5">{navItem.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button - always visible */}
          <div className="flex items-center max-md:gap-0 md:gap-3">
            <div className="hidden items-center gap-3 md:flex">{renderCtaButton()}</div>
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile menu content - renders inline below header bar */}
      <div
        className={cx(
          "md:hidden w-full overflow-hidden transition-all duration-300 ease-in-out",
          // Expand to full viewport height minus top position (4rem) and equal bottom margin (4rem)
          isMobileMenuOpen ? "max-h-[calc(100vh-8rem)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="py-5 overflow-y-auto scrollbar-hide max-h-[calc(100vh-10rem)]">
          <ul className="flex flex-col gap-0.5">
            {items.map((navItem) =>
              navItem.menu ? (
                <MobileNavItem
                  key={navItem.label}
                  label={navItem.label}
                  isMenuOpen={isMobileMenuOpen}
                >
                  {navItem.menu}
                </MobileNavItem>
              ) : (
                <MobileNavItem
                  key={navItem.label}
                  label={navItem.label}
                  href={navItem.href}
                  isMenuOpen={isMobileMenuOpen}
                />
              ),
            )}
          </ul>

          <MobileFooter ctaButton={ctaButton} />
        </div>
      </div>
    </div>
  )
}
