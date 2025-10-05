"use client";

import { InfoCircle, Briefcase01, File01 } from "@untitledui/icons";
import { NavMenuItemLink } from '../uui-components/base-components/nav-menu-item';

export const TDSAboutDropdown = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-2xl bg-secondary py-2 ring-1 ring-secondary md:p-2 ">
                <ul className="flex flex-col gap-0.5">
                    <li>
                        <NavMenuItemLink
                            icon={InfoCircle}
                            title="About Us"
                            subtitle="Learn about our mission and the team behind The Digital Stride"
                            href="/about"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={Briefcase01}
                            title="Careers"
                            subtitle="Join our growing team of digital marketing experts"
                            href="/careers"
                        />
                    </li>
                    <li>
                        <NavMenuItemLink
                            icon={File01}
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