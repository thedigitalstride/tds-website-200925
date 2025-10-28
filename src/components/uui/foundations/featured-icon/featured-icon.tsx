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
            brand: "bg-primary text-brand-500 dark:text-white",
            "brand-reversed": "bg-brand-solid text-white dark:!bg-white dark:text-brand-500",
            accent: "bg-accent-solid !text-white",
            secondary: "bg-transparent text-brand-500 dark:text-white ring-1 ring-gray-solid ring-inset",
            tertiary: "bg-gray-solid text-brand-500 dark:text-brand-900",
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
            brand: "bg-primary text-brand-500 dark:text-white",
            "brand-reversed": "bg-brand-solid text-white dark:!bg-white dark:text-brand-500",
            accent: "bg-accent-solid !text-white",
            secondary: "bg-transparent text-brand-500 dark:text-white ring-1 ring-gray-solid ring-inset",
            tertiary: "bg-gray-solid text-brand-500 dark:text-brand-900",
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
    color: "brand" | "brand-reversed" | "accent" | "secondary" | "tertiary";
    shape?: "rounded-square" | "round";
}

export const FeaturedIcon = (props: FeaturedIconProps) => {
    const { size = "sm", shape = "rounded-square", color = "brand", icon: Icon, svgCode, ...otherProps } = props;

    // Defensive: Handle legacy shape values from database by falling back to rounded-square
    const validShape = (shape in styles) ? shape : "rounded-square";

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
                <IconSVG svgCode={svgCode} className="z-1 h-full w-full" />
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
