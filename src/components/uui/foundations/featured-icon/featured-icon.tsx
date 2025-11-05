import type { FC, ReactNode, Ref } from "react";
import { isValidElement } from "react";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import { IconSVG } from '@/components/IconSVG';

const iconsSizes = {
    sm: "*:data-icon:size-4",
    md: "*:data-icon:size-5",
    lg: "*:data-icon:size-6",
    xl: "*:data-icon:size-7",
};

const styles = sortCx({
    "rounded-square": {
        base: "",
        sizes: {
            sm: "size-8 rounded-sm",
            md: "size-10 rounded-md",
            lg: "size-12 rounded-lg",
            xl: "size-14 rounded-xl",
        },
        colors: {
            primary: "bg-primary text-white dark:text-brand-500",
            "primary-reversed": "bg-primary-reversed text-brand-500 dark:text-white",
            accent: "bg-accent-solid text-white! dark:text-white! *:data-icon:text-white! dark:*:data-icon:text-white! [&_*]:text-white! dark:[&_*]:text-white!",
            secondary: "bg-secondary text-brand-500 dark:text-white",
            tertiary: "bg-transparent ring-2 ring-accent-solid ring-inset text-primary dark:text-brand-500",
            outline: "bg-transparent text-primary dark:text-white ring-2 ring-outline ring-inset",
        },
    },

    round: {
        base: "rounded-full",
        sizes: {
            sm: "size-8",
            md: "size-10",
            lg: "size-12",
            xl: "size-14",
        },
        colors: {
            primary: "bg-primary text-white dark:text-brand-500",
            "primary-reversed": "bg-primary-reversed text-brand-500 dark:text-white",
            accent: "bg-accent-solid text-white! dark:text-white! *:data-icon:text-white! dark:*:data-icon:text-white! [&_*]:text-white! dark:[&_*]:text-white!",
            secondary: "bg-secondary text-brand-500 dark:text-white",
            tertiary: "bg-transparent ring-2 ring-accent-solid ring-inset text-primary dark:text-brand-500",
            outline: "bg-transparent text-primary dark:text-white ring-2 ring-outline ring-inset",
        },
    },
});

interface FeaturedIconProps {
    ref?: Ref<HTMLDivElement>;
    children?: ReactNode;
    className?: string;
    icon?: FC<{ className?: string }> | ReactNode;
    svgCode?: string;
    size?: "sm" | "md" | "lg" | "xl";

    color: "primary" | "primary-reversed" | "accent" | "secondary" | "tertiary" | "outline";
    shape?: "rounded-square" | "round";
}

export const FeaturedIcon = (props: FeaturedIconProps) => {
    const { size = "sm", shape = "rounded-square", color = "primary", icon: Icon, svgCode, ...otherProps } = props;

    // Defensive: Handle legacy shape values from database by falling back to rounded-square
    const validShape = (shape in styles) ? shape : "rounded-square";

    // Icon size classes (slightly smaller than container for proper padding)
    const iconSizeClasses = {
        sm: "size-5",
        md: "size-6",
        lg: "size-8",
        xl: "size-10",
    };

    return (
        <div
            {...otherProps}
            data-featured-icon
            className={cx(
                "relative flex shrink-0 items-center justify-center",

                iconsSizes[size],
                styles[validShape].base,
                styles[validShape].sizes[size],
                styles[validShape].colors[color],

                props.className,
            )}
        >
            {svgCode ? (
                <IconSVG svgCode={svgCode} className={`z-1 ${iconSizeClasses[size]}`} />
            ) : (
                <>
                    {isReactComponent(Icon) && <Icon data-icon className="z-1" />}
                    {isValidElement(Icon) && <div className="z-1">{Icon}</div>}
                </>
            )}

            {props.children}
        </div>
    );
};
