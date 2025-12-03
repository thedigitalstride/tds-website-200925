"use client";

import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "@/utilities/cx";

interface HintTextProps extends AriaTextProps {
    /** Indicates that the hint text is an error message. */
    isInvalid?: boolean;
    ref?: Ref<HTMLElement>;
    children: ReactNode;
}

export const HintText = ({ isInvalid, className, ...props }: HintTextProps) => {
    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            className={cx(
                "text-sm text-gray-600",

                // Invalid state - use explicit RGB to match light mode appearance in both modes
                isInvalid && "text-[rgb(217_45_32)]",
                "group-invalid:text-[rgb(217_45_32)]",

                className,
            )}
        />
    );
};

HintText.displayName = "HintText";
