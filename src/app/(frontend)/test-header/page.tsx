"use client";

import { Fragment } from "react";
import { ArrowRight, TrendingUp, Users, Search, Mail, Info, Briefcase, Newspaper } from "@untitledui/icons";
import { Header } from '@/components/uui/marketing/header-navigation/header';
import { DropdownMenuSimple } from '@/components/uui/marketing/header-navigation/dropdown-menu-simple';
import { DropdownMenuSimpleWithFooter } from '@/components/uui/marketing/header-navigation/dropdown-menu-simple-with-footer';
import { DropdownMenuFeatureCard } from '@/components/uui/marketing/header-navigation/dropdown-menu-feature-card';
import { DropdownMenuWithTwoColsAndLinksAndFooter } from '@/components/uui/marketing/header-navigation/dropdown-menu-with-two-cols-and-links-and-footer';
import { NavMenuItemLink } from '@/components/uui/marketing/header-navigation/base-components/nav-menu-item';
import { BadgeGroup } from "@/components/uui/base/badges/badge-groups";
import { Button } from "@/components/uui/base/buttons/button";
import { Form } from "@/components/uui/base/form/form";
import { Input } from "@/components/uui/base/input/input";

// Custom TDS dropdown components
const TDSServicesDropdown = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    <li>
                        <NavMenuItemLink
                            icon={TrendingUp}
                            title="PPC Management"
                            subtitle="Drive immediate results with targeted paid advertising campaigns"
                            href="/services/ppc"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Users}
                            title="Social Media Marketing"
                            subtitle="Build your brand and engage with your audience across social platforms"
                            href="/services/social-media"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Search}
                            title="SEO Services"
                            subtitle="Improve your organic search rankings and visibility"
                            href="/services/seo"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Mail}
                            title="Email Marketing"
                            subtitle="Connect with customers through targeted email campaigns"
                            href="/services/email"
                        />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const TDSAboutDropdown = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    <li>
                        <NavMenuItemLink
                            icon={Info}
                            title="About Us"
                            subtitle="Learn about our mission and the team behind The Digital Stride"
                            href="/about"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Briefcase}
                            title="Careers"
                            subtitle="Join our growing team of digital marketing experts"
                            href="/careers"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Newspaper}
                            title="News & Insights"
                            subtitle="Latest updates and thought leadership from our team"
                            href="/insights"
                        />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Hero section component without the built-in header
const HeroSectionOnly = () => {
    return (
        <section className="relative bg-primary py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
            <div className="mx-auto flex w-full max-w-container items-center px-4 md:px-8">
                <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pr-8">
                    <a href="#" className="rounded-[10px] outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeGroup className="hidden md:flex" size="lg" addonText="We're hiring!" iconTrailing={ArrowRight} theme="modern" color="brand">
                            Join our remote team
                        </BadgeGroup>
                        <BadgeGroup className="md:hidden" size="md" addonText="We're hiring!" iconTrailing={ArrowRight} theme="modern" color="brand">
                            Join our remote team
                        </BadgeGroup>
                    </a>

                    <h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                        People who care about your growth
                    </h1>

                    <p className="mt-6 text-xl text-tertiary">
                        We're a group of passionate people working from around the world to build the future of testing.
                    </p>

                    <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            className="flex-1"
                        />
                        <Button className="sm:w-auto">
                            Get started
                        </Button>
                    </div>

                    <p className="mt-5 text-sm text-quaternary">
                        Start your free trial, no credit card required.
                    </p>
                </div>

                <div className="mt-12 lg:mt-0 lg:w-1/2">
                    <img
                        className="aspect-square w-full rounded-[20px] object-cover"
                        src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Team collaboration"
                    />
                </div>
            </div>
        </section>
    );
};

export default function TestHeaderPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    UntitledUI Header Component Testing
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Testing various header configurations and dropdown menu types in a safe environment.
                </p>
            </div>

            {/* Test Section 1: Default Header */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">1. Default Header (Built-in Navigation)</h2>
                <p className="test-description">
                    The header component with its default navigation items and various dropdown types.
                </p>
                <div className="border rounded bg-white">
                    <Header />
                </div>
            </section>

            {/* Test Section 2: TDS Navigation with Custom Dropdowns */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">2. TDS Navigation with Custom Dropdowns</h2>
                <p className="test-description">
                    The Digital Stride navigation structure with custom dropdown content matching their actual services and about sections.
                </p>
                <div className="border rounded bg-white">
                    <Header
                        items={[
                            { label: "STRIDE Methodology™", href: "/methodology" },
                            { label: "Services", href: "/services", menu: <TDSServicesDropdown /> },
                            { label: "Case Studies", href: "/case-studies" },
                            { label: "About", href: "/about", menu: <TDSAboutDropdown /> },
                            { label: "Contact", href: "/contact" },
                        ]}
                    />
                </div>
            </section>

            {/* Test Section 3: TDS Navigation with Mixed UUI Dropdown Types */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">3. TDS Navigation with Mixed UUI Dropdown Types</h2>
                <p className="test-description">
                    TDS navigation using different UUI dropdown styles: feature cards for services, complex layout for about section.
                </p>
                <div className="border rounded bg-white">
                    <Header
                        items={[
                            {
                                label: "STRIDE Methodology™",
                                href: "/methodology"
                            },
                            {
                                label: "Services",
                                href: "/services",
                                menu: <DropdownMenuFeatureCard />
                            },
                            {
                                label: "Case Studies",
                                href: "/case-studies"
                            },
                            {
                                label: "About",
                                href: "/about",
                                menu: <DropdownMenuWithTwoColsAndLinksAndFooter />
                            },
                            {
                                label: "Contact",
                                href: "/contact"
                            },
                        ]}
                    />
                </div>
            </section>

            {/* Test Section 4: Header with Hero Section */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">4. Header with Hero Section Integration</h2>
                <p className="test-description">
                    Complete page layout showing header integration with a hero section (hero header removed to avoid duplication).
                </p>
                <div className="border rounded bg-white overflow-hidden">
                    <Header />
                    <HeroSectionOnly />
                </div>
            </section>

            {/* Test Section 5: TDS Floating Header */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">5. TDS Floating Header</h2>
                <p className="test-description">
                    TDS navigation with floating header styling option.
                </p>
                <div className="border rounded bg-gray-100 p-4 min-h-96">
                    <Header
                        isFloating={true}
                        items={[
                            { label: "STRIDE Methodology™", href: "/methodology" },
                            { label: "Services", href: "/services", menu: <TDSServicesDropdown /> },
                            { label: "Case Studies", href: "/case-studies" },
                            { label: "About", href: "/about", menu: <TDSAboutDropdown /> },
                            { label: "Contact", href: "/contact" },
                        ]}
                    />
                    <div className="pt-20 text-center text-gray-600">
                        <p>Content below floating TDS header...</p>
                    </div>
                </div>
            </section>

            {/* Test Section 6: Pure TDS Navigation (Exact Replica) */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">6. Pure TDS Navigation (Exact Website Replica)</h2>
                <p className="test-description">
                    The exact navigation structure from The Digital Stride website with branded styling and content.
                </p>
                <div className="border rounded bg-white">
                    <Header
                        items={[
                            { label: "STRIDE Methodology™", href: "/methodology" },
                            { label: "Services", href: "/services", menu: <TDSServicesDropdown /> },
                            { label: "Case Studies", href: "/case-studies" },
                            { label: "About", href: "/about", menu: <TDSAboutDropdown /> },
                            { label: "Contact", href: "/contact" },
                        ]}
                    />
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded">
                    <h3 className="font-medium mb-2 text-blue-900">TDS Navigation Structure:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li><strong>STRIDE Methodology™</strong> - Their unique approach to digital marketing</li>
                        <li><strong>Services</strong> - PPC Management, Social Media, SEO, Email Marketing</li>
                        <li><strong>Case Studies</strong> - Client success stories and results</li>
                        <li><strong>About</strong> - About Us, Careers, News & Insights</li>
                        <li><strong>Contact</strong> - Get in touch with the team</li>
                    </ul>
                </div>
            </section>

            {/* Responsive Testing Instructions */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">Mobile Testing Instructions</h2>
                <div className="bg-blue-50 p-4 rounded">
                    <p className="text-blue-800 mb-2">
                        <strong>To test mobile functionality:</strong>
                    </p>
                    <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• Resize your browser window to mobile width (&lt; 768px)</li>
                        <li>• Verify hamburger menu appears</li>
                        <li>• Test mobile navigation drawer</li>
                        <li>• Check dropdown behavior on mobile</li>
                        <li>• Use browser developer tools for precise breakpoint testing</li>
                    </ul>
                </div>
            </section>

            {/* Component Information */}
            <section className="test-section container mx-auto">
                <h2 className="test-title">Component Information</h2>
                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-medium mb-2">TDS Custom Dropdown Components:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <code>TDSServicesDropdown</code> - Custom dropdown with TDS services (PPC, Social Media, SEO, Email)</li>
                        <li>• <code>TDSAboutDropdown</code> - Custom dropdown with TDS about items (About Us, Careers, News)</li>
                    </ul>

                    <h3 className="font-medium mb-2 mt-4">Available UUI Dropdown Types:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <code>DropdownMenuSimple</code> - Basic dropdown with navigation items</li>
                        <li>• <code>DropdownMenuSimpleWithFooter</code> - Simple dropdown with footer links</li>
                        <li>• <code>DropdownMenuFeatureCard</code> - Feature-focused dropdown with cards</li>
                        <li>• <code>DropdownMenuWithTwoColsAndLinksAndFooter</code> - Complex multi-column layout</li>
                    </ul>

                    <h3 className="font-medium mb-2 mt-4">TDS Navigation Items:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <strong>STRIDE Methodology™</strong> - No dropdown (direct link)</li>
                        <li>• <strong>Services</strong> - Dropdown with PPC, Social Media, SEO, Email Marketing</li>
                        <li>• <strong>Case Studies</strong> - No dropdown (direct link)</li>
                        <li>• <strong>About</strong> - Dropdown with About Us, Careers, News & Insights</li>
                        <li>• <strong>Contact</strong> - No dropdown (direct link)</li>
                    </ul>

                    <h3 className="font-medium mb-2 mt-4">Header Props:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• <code>items</code> - Array of navigation items</li>
                        <li>• <code>isFullWidth</code> - Full width styling</li>
                        <li>• <code>isFloating</code> - Floating header style</li>
                        <li>• <code>className</code> - Custom CSS classes</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}