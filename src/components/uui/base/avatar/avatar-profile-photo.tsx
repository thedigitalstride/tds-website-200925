"use client";

import { User01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { type AvatarProps } from "./avatar";
import { AvatarOnlineIndicator, VerifiedTick } from "./base-components";
import { OptimizedImage } from "@/components/OptimizedImage";

const styles = {
    sm: {
        root: "size-18 p-0.75",
        rootWithPlaceholder: "p-1",
        content: "",
        icon: "size-9",
        initials: "text-display-sm font-semibold",
        badge: "bottom-0.5 right-0.5",
        pixels: 72,
    },
    md: {
        root: "size-24 p-1",
        rootWithPlaceholder: "p-1.25",
        content: "shadow-xl",
        icon: "size-12",
        initials: "text-display-md font-semibold",
        badge: "bottom-1 right-1",
        pixels: 96,
    },
    lg: {
        root: "size-40 p-1.5",
        rootWithPlaceholder: "p-1.75",
        content: "shadow-2xl",
        icon: "size-20",
        initials: "text-display-xl font-semibold",
        badge: "bottom-2 right-2",
        pixels: 160,
    },
};

const tickSizeMap = {
    sm: "2xl",
    md: "3xl",
    lg: "4xl",
} as const;

interface AvatarProfilePhotoProps extends AvatarProps {
    size: "sm" | "md" | "lg";
}

export const AvatarProfilePhoto = ({
    contrastBorder = true,
    size = "md",
    src,
    alt,
    initials,
    placeholder,
    placeholderIcon: PlaceholderIcon,
    verified,
    badge,
    status,
    className,
}: AvatarProfilePhotoProps) => {
    const renderMainContent = () => {
        if (src) {
            const imageSize = styles[size].pixels;
            return (
                <OptimizedImage
                    src={src}
                    alt={alt || "Profile photo"}
                    width={imageSize}
                    height={imageSize}
                    sizes={`${imageSize}px`}
                    className={cx(
                        "size-full rounded-full object-cover",
                        contrastBorder && "outline-1 -outline-offset-1 outline-avatar-contrast-border",
                        styles[size].content,
                    )}
                />
            );
        }

        if (initials) {
            return (
                <div className={cx("flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-secondary_alt", styles[size].content)}>
                    <span className={cx("text-quaternary", styles[size].initials)}>{initials}</span>
                </div>
            );
        }

        if (PlaceholderIcon) {
            return (
                <div className={cx("flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-secondary_alt", styles[size].content)}>
                    <PlaceholderIcon className={cx("text-fg-quaternary", styles[size].icon)} />
                </div>
            );
        }

        return (
            <div className={cx("flex size-full items-center justify-center rounded-full bg-tertiary ring-1 ring-secondary_alt", styles[size].content)}>
                {placeholder || <User01 className={cx("text-fg-quaternary", styles[size].icon)} />}
            </div>
        );
    };

    const renderBadgeContent = () => {
        if (status) {
            return <AvatarOnlineIndicator status={status} size={tickSizeMap[size]} className={styles[size].badge} />;
        }

        if (verified) {
            return <VerifiedTick size={tickSizeMap[size]} className={cx("absolute", styles[size].badge)} />;
        }

        return badge;
    };

    return (
        <div
            className={cx(
                "relative flex shrink-0 items-center justify-center rounded-full bg-primary ring-1 ring-secondary_alt",
                styles[size].root,
                !src && styles[size].rootWithPlaceholder,
                className,
            )}
        >
            {renderMainContent()}
            {renderBadgeContent()}
        </div>
    );
};
