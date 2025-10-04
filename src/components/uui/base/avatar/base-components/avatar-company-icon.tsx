"use client";

import { cx } from "@/utils/cx";
import { OptimizedImage } from "@/components/OptimizedImage";

const sizes = {
    xs: { className: "size-2", pixels: 8 },
    sm: { className: "size-3", pixels: 12 },
    md: { className: "size-3.5", pixels: 14 },
    lg: { className: "size-4", pixels: 16 },
    xl: { className: "size-4.5", pixels: 18 },
    "2xl": { className: "size-5 ring-[1.67px]", pixels: 20 },
};

interface AvatarCompanyIconProps {
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    src: string;
    alt?: string;
}

export const AvatarCompanyIcon = ({ size, src, alt }: AvatarCompanyIconProps) => {
    const sizeConfig = sizes[size];
    return (
        <OptimizedImage
            src={src}
            alt={alt || "Company icon"}
            width={sizeConfig.pixels}
            height={sizeConfig.pixels}
            className={cx("bg-primary-25 absolute -right-0.5 -bottom-0.5 rounded-full object-cover ring-[1.5px] ring-bg-primary", sizeConfig.className)}
            priority={false}
        />
    );
};
