"use client";

import React from 'react';
import { Header } from './uui-components/header';
import { TDSServicesDropdown, TDSAboutDropdown } from './TDSDropdowns';

interface UUIHeaderProps {
  isFloating?: boolean;
  className?: string;
}

export const UUIHeader: React.FC<UUIHeaderProps> = ({
  isFloating = true,
  className = ''
}) => {
  const tdsNavigationItems = [
    {
      label: "STRIDE Methodology™",
      href: "/methodology"
    },
    {
      label: "Services",
      href: "/services",
      menu: <TDSServicesDropdown />
    },
    {
      label: "Case Studies",
      href: "/case-studies"
    },
    {
      label: "About",
      href: "/about",
      menu: <TDSAboutDropdown />
    },
    {
      label: "Contact",
      href: "/contact"
    },
  ];

  return (
    <Header
      isFloating={isFloating}
      items={tdsNavigationItems}
      className={className}
    />
  );
};