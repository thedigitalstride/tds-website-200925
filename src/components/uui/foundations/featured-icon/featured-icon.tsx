import type { FC, ReactNode, Ref } from "react";
import { isValidElement } from "react";
import { cx, sortCx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

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
            sm: "size-8 rounded-md",
            md: "size-10 rounded-lg",
            lg: "size-12 rounded-[10px]",
            xl: "size-14 rounded-xl",
        },
        colors: {
            brand: "bg-brand-solid !text-white dark:!text-brand-500",
            accent: "bg-accent-solid !text-white",
            secondary: "bg-transparent !text-brand-500/80 dark:!text-white/80 ring-1 ring-black/20 dark:ring-white/25 ring-inset",
            tertiary: "bg-black/20 dark:bg-white/20 !text-white dark:!text-black",
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
            brand: "bg-brand-solid !text-white dark:!text-brand-500",
            accent: "bg-accent-solid !text-white",
            secondary: "bg-transparent !text-brand-solid dark:!text-white ring-1 ring-black/25 dark:ring-white/20 ring-inset",
            tertiary: "bg-black/20 dark:bg-white/20 !text-white dark:!text-black",
        },
    },
});

interface FeaturedIconProps {
    ref?: Ref<HTMLDivElement>;
    children?: ReactNode;
    className?: string;
    icon?: FC<{ className?: string }> | ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    color: "brand" | "accent" | "secondary" | "tertiary";
    shape?: "rounded-square" | "round";
}

export const FeaturedIcon = (props: FeaturedIconProps) => {
    const { size = "sm", shape = "rounded-square", color = "brand", icon: Icon, ...otherProps } = props;

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
            {isReactComponent(Icon) && <Icon data-icon className="z-1" />}
            {isValidElement(Icon) && <div className="z-1">{Icon}</div>}

            {props.children}
        </div>
    );
};
