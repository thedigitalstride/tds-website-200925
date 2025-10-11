"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { ChevronDown } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/uui/button";
import { TDSLogo } from '@/components/Logo/tds-logo';
import { cx } from "@/utils/cx";
import Link from "next/link";
import { DropdownMenuFeatureCard } from "./dropdown-menu-feature-card";
import { DropdownMenuSimpleWithFooter } from "./dropdown-menu-simple-with-footer";
import { DropdownMenuWithTwoColsAndLinksAndFooter } from "./dropdown-menu-with-two-cols-and-links-and-footer";
import { MobileMenuButton } from "../components/MobileMenuButton";
import { motion } from "motion/react";

type HeaderNavItem = {
    label: string;
    href?: string;
    menu?: ReactNode;
};

const headerNavItems: HeaderNavItem[] = [
    { label: "Products", href: "/products", menu: <DropdownMenuSimpleWithFooter /> },
    { label: "Services", href: "/Services", menu: <DropdownMenuFeatureCard /> },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources", menu: <DropdownMenuWithTwoColsAndLinksAndFooter /> },
    { label: "About", href: "/about" },
];

const footerNavItems = [
    { label: "About us", href: "/" },
    { label: "Press", href: "/products" },
    { label: "Careers", href: "/resources" },
    { label: "Legal", href: "/pricing" },
    { label: "Support", href: "/pricing" },
    { label: "Contact", href: "/pricing" },
    { label: "Sitemap", href: "/pricing" },
    { label: "Cookie settings", href: "/pricing" },
];

const MobileNavItem = (props: { className?: string; label: string; href?: string; children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (props.href) {
        return (
            <li>
                <a href={props.href} className="flex items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover">
                    {props.label}
                </a>
            </li>
        );
    }

    return (
        <li className="flex flex-col gap-0.5">
            <button
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover"
            >
                {props.label}{" "}
                <ChevronDown
                    className={cx("size-4 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear", isOpen ? "-rotate-180" : "rotate-0")}
                />
            </button>
            {isOpen && <div>{props.children}</div>}
        </li>
    );
};

const MobileFooter = ({ ctaButton }: { ctaButton?: HeaderProps['ctaButton'] }) => {
    // Helper function to render CTA button - moved here to be in scope
    const renderCtaButton = (sizeProp?: "sm" | "md" | "lg" | "xl") => {
        const defaultSize = sizeProp || "lg";

        if (!ctaButton?.enabled || !ctaButton.link) {
            // Default fallback
            return (
                <Button color="secondary" size={defaultSize}>
                    ENQUIRE
                </Button>
            );
        }

        const linkData = ctaButton.link;
        let href = '#';

        if (linkData.type === 'reference' && linkData.reference) {
            if (typeof linkData.reference === 'object' && 'slug' in linkData.reference) {
                href = `/${linkData.reference.slug}`;
            }
        } else if (linkData.type === 'custom' && linkData.url) {
            href = linkData.url;
        }

        const size = (linkData.uuiSize && ['sm', 'md', 'lg', 'xl'].includes(linkData.uuiSize))
            ? linkData.uuiSize as "sm" | "md" | "lg" | "xl"
            : defaultSize;
        const color = (linkData.uuiColor && ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor))
            ? linkData.uuiColor as "primary" | "accent" | "secondary" | "tertiary" | "link"
            : "secondary";

        return (
            <Button
                color={color}
                size={size}
                href={href}
                {...(linkData.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {linkData.label || 'ENQUIRE'}
            </Button>
        );
    };

    return (
        <div className="flex flex-col gap-8 border-t border-secondary px-4 py-6">
            <div>
                <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-3">
                    {footerNavItems.map((navItem) => (
                        <li key={navItem.label}>
                            <Button color="link" size="lg" href={navItem.href}>
                                {navItem.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                {renderCtaButton("lg")}
            </div>
        </div>
    );
};

interface HeaderProps {
    items?: HeaderNavItem[];
    isFullWidth?: boolean;
    isFloating?: boolean;
    className?: string;
    logoVariant?: 'auto' | 'dark' | 'light';
    isCollapsed?: boolean;
    ctaButton?: {
        enabled: boolean;
        link: {
            label?: string;
            type: 'reference' | 'custom';
            reference?: { value: number | { slug?: string | null }; relationTo: string };
            url?: string;
            newTab?: boolean;
            uuiColor?: string;
            uuiSize?: string;
        };
    };
}

export const Header = ({ items = headerNavItems, isFullWidth, isFloating, className, logoVariant = 'auto', ctaButton, isCollapsed = false }: HeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);

    // Helper function to render CTA button
    const renderCtaButton = (sizeProp?: "sm" | "md" | "lg" | "xl") => {
        const defaultSize = sizeProp || (isFloating ? "md" : "lg");

        if (!ctaButton?.enabled || !ctaButton.link) {
            // Default fallback
            return (
                <Button color="secondary" size={defaultSize}>
                    ENQUIRE
                </Button>
            );
        }

        const linkData = ctaButton.link;
        let href = '#';

        if (linkData.type === 'reference' && linkData.reference) {
            if (typeof linkData.reference === 'object' && 'slug' in linkData.reference) {
                href = `/${linkData.reference.slug}`;
            }
        } else if (linkData.type === 'custom' && linkData.url) {
            href = linkData.url;
        }

        const size = (linkData.uuiSize && ['sm', 'md', 'lg', 'xl'].includes(linkData.uuiSize))
            ? linkData.uuiSize as "sm" | "md" | "lg" | "xl"
            : defaultSize;
        const color = (linkData.uuiColor && ['primary', 'accent', 'secondary', 'tertiary', 'link'].includes(linkData.uuiColor))
            ? linkData.uuiColor as "primary" | "accent" | "secondary" | "tertiary" | "link"
            : "secondary";

        return (
            <Button
                color={color}
                size={size}
                href={href}
                {...(linkData.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {linkData.label || 'ENQUIRE'}
            </Button>
        );
    };

    return (
        <header
            ref={headerRef}
            className={cx(
                "relative flex h-18 w-full items-center justify-center md:h-20",
                isFloating && "h-16 md:h-19 md:backdrop-blur-sm max-md:backdrop-blur-sm max-md:pt-3 max-md:pb-3",
                isFullWidth && !isFloating ? "has-aria-expanded:bg-primary" : "max-md:has-aria-expanded:bg-primary",
                className,
            )}
        >
            <div className="flex size-full flex-1 items-center px-4 py-3 md:px-5 md:py-3">
                <div
                    className={cx(
                        "relative flex w-full items-center",
                        isFloating && "md:rounded-lg md:py-3 md:pr-3 md:pl-4",
                    )}
                >
                        {/* Logo and Nav Container - absolutely positioned, removed from flow */}
                        <motion.div
                            initial={false}
                            animate={{
                                x: isCollapsed ? 100 : 0,
                                opacity: isCollapsed ? 0 : 1
                            }}
                            transition={{
                                opacity: {
                                    duration: 0.15,
                                    ease: "easeOut",
                                    delay: isCollapsed ? 0 : 0.2  // Delay fade-in when expanding
                                },
                                x: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 35,
                                    mass: 0.5
                                }
                            }}
                            className="absolute left-0 top-0 flex h-full w-full items-center gap-4"
                        >
                            {/* Logo Section */}
                            <Link href="/" className="flex items-center whitespace-nowrap">
                                <TDSLogo variant={logoVariant} size="xl" className="hidden h-12 lg:inline-block" />
                                <TDSLogo variant={logoVariant} size="lg" className="hidden h-10 md:inline-block lg:hidden" />
                                <TDSLogo variant={logoVariant} size="md" className="h-8 md:hidden" />
                            </Link>

                            {/* Centered Navigation */}
                            <nav className="max-md:hidden flex-1 flex justify-center">
                                <ul className="flex items-center gap-0.5 whitespace-nowrap">
                                    {items.map((navItem) => (
                                        <li key={navItem.label}>
                                            {navItem.menu ? (
                                                <AriaDialogTrigger>
                                                    <AriaButton className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2">
                                                        <span className="px-0.5">{navItem.label}</span>

                                                        <ChevronDown className="size-4 rotate-0 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear in-aria-expanded:-rotate-180" />
                                                    </AriaButton>

                                                    <AriaPopover
                                                        className={({ isEntering, isExiting }) =>
                                                            cx(
                                                                "hidden origin-top will-change-transform md:block",
                                                                isFullWidth && "w-full",
                                                                isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                                                                isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                                                            )
                                                        }
                                                        offset={isFloating || isFullWidth ? 0 : 8}
                                                        containerPadding={0}
                                                        triggerRef={(isFloating && isFullWidth) || isFullWidth ? headerRef : undefined}
                                                    >
                                                        {({ isEntering, isExiting }) => (
                                                            <AriaDialog
                                                                className={cx(
                                                                    "mx-auto origin-top outline-hidden",
                                                                    isFloating && "max-w-7xl px-8 pt-3",
                                                                    // Have to use the scale animation inside the popover to avoid
                                                                    // miscalculating the popover's position when opening.
                                                                    isEntering && !isFullWidth && "duration-200 ease-out animate-in zoom-in-95",
                                                                    isExiting && !isFullWidth && "duration-150 ease-in animate-out zoom-out-95",
                                                                )}
                                                            >
                                                                {navItem.menu}
                                                            </AriaDialog>
                                                        )}
                                                    </AriaPopover>
                                                </AriaDialogTrigger>
                                            ) : (
                                                <a
                                                    href={navItem.href}
                                                    className="flex cursor-pointer items-center gap-0.5 rounded-lg px-1.5 py-1 text-md font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus:outline-offset-2 focus-visible:outline-2"
                                                >
                                                    <span className="px-0.5">{navItem.label}</span>
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>

                        {/* Button container - in normal flow, determines width when collapsed */}
                        <div className="ml-auto flex items-center gap-3">
                            {/* CTA Button - stays visible */}
                            <div className="hidden items-center gap-3 md:flex">
                                {renderCtaButton()}
                            </div>
                        </div>

                        {/* Mobile menu and menu trigger - stays visible */}
                        <AriaDialogTrigger>
                            <MobileMenuButton />
                            <AriaPopover
                                triggerRef={headerRef}
                                className="h-calc(100%-72px) scrollbar-hide w-full overflow-y-auto shadow-lg md:hidden"
                                offset={0}
                                crossOffset={20}
                                containerPadding={0}
                                placement="bottom left"
                            >
                                <AriaDialog className="outline-hidden">
                                    <nav className="w-full bg-primary shadow-lg">
                                        <ul className="flex flex-col gap-0.5 py-5">
                                            {items.map((navItem) =>
                                                navItem.menu ? (
                                                    <MobileNavItem key={navItem.label} label={navItem.label}>
                                                        {navItem.menu}
                                                    </MobileNavItem>
                                                ) : (
                                                    <MobileNavItem key={navItem.label} label={navItem.label} href={navItem.href} />
                                                ),
                                            )}
                                        </ul>

                                        <MobileFooter ctaButton={ctaButton} />
                                    </nav>
                                </AriaDialog>
                            </AriaPopover>
                        </AriaDialogTrigger>
                    </div>
                </div>
            </header>
        );
};
