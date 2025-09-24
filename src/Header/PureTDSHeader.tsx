"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu01, X } from "@untitledui/icons";
import { Button } from "@/components/uui/button";
import { TDSServicesDropdown, TDSAboutDropdown } from './TDSDropdowns';

interface PureTDSHeaderProps {
  className?: string;
}

export const PureTDSHeader: React.FC<PureTDSHeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    {
      label: "STRIDE Methodology™",
      href: "/methodology",
      hasDropdown: false
    },
    {
      label: "Services",
      href: "/services",
      hasDropdown: true,
      dropdown: <TDSServicesDropdown />
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      hasDropdown: false
    },
    {
      label: "About",
      href: "/about",
      hasDropdown: true,
      dropdown: <TDSAboutDropdown />
    },
    {
      label: "Contact",
      href: "/contact",
      hasDropdown: false
    }
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-brand-600">
                TDS
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 z-50">
                        <div
                          className="bg-white"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.dropdown}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-brand-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button color="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-600 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu01 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 text-base font-medium"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown Content */}
                      {activeDropdown === item.label && (
                        <div className="pl-4 pr-3 py-2 bg-gray-50">
                          {item.dropdown}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 text-base font-medium"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              <div className="px-3 py-4">
                <Button color="primary" size="md" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};