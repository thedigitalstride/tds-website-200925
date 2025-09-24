"use client";

import { TrendUp01, Users01, SearchLg, Mail01 } from "@untitledui/icons";
import { NavMenuItemLink } from '../uui-components/base-components/nav-menu-item';

export const TDSServicesDropdown = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-primary py-2 shadow-xs ring-1 ring-secondary_alt md:p-2 md:shadow-lg">
                <ul className="flex flex-col gap-0.5">
                    <li>
                        <NavMenuItemLink
                            icon={TrendUp01}
                            title="PPC Management"
                            subtitle="Drive immediate results with targeted paid advertising campaigns"
                            href="/services/ppc"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Users01}
                            title="Social Media Marketing"
                            subtitle="Build your brand and engage with your audience across social platforms"
                            href="/services/social-media"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={SearchLg}
                            title="SEO Services"
                            subtitle="Improve your organic search rankings and visibility"
                            href="/services/seo"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Mail01}
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