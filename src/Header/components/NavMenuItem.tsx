"use client";

import { type FC, type ReactNode, isValidElement } from "react";
import { motion } from "motion/react";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

interface NavMenuItemLinkProps {
    href: string;
    icon?: FC<{ className?: string }> | ReactNode;
    iconClassName?: string;
    className?: string;
    title: string;
    subtitle?: string;
    badge?: ReactNode;
    actionsContent?: ReactNode;
}

const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export const NavMenuItemLink = ({ href, icon: Icon, iconClassName, title, badge, subtitle, className, actionsContent }: NavMenuItemLinkProps) => (
    <a
        href={href}
        className={cx(
            "inline-flex w-full gap-3 px-4 py-3 outline-focus-ring transition duration-200 ease-linear focus-visible:outline-2 sm:max-w-80 sm:p-3 rounded-md",
            "hover:bg-brand-900 dark:hover:bg-gray-100",
            className,
        )}
    >
        <motion.div
            variants={childVariants}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
            {isValidElement(Icon) && Icon}
            {isReactComponent(Icon) && <Icon className={cx("mt-0.5 size-4 shrink-0 stroke-[2.3px]", "text-white dark:text-brand-500", iconClassName)} />}
        </motion.div>

        <motion.div
            className="flex flex-col gap-3"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.08
                    }
                }
            }}
        >
            <div className="flex flex-col gap-0.5">
                <motion.div
                    className="flex items-center gap-2"
                    variants={childVariants}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className={cx("text-md font-semibold", "text-white dark:text-brand-500")}>{title}</span>
                    {badge}
                </motion.div>

                {subtitle && (
                    <motion.span
                        className={cx("line-clamp-2 text-sm", "text-white/80 dark:text-brand-400")}
                        variants={childVariants}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {subtitle}
                    </motion.span>
                )}
            </div>

            {actionsContent && (
                <motion.div
                    variants={childVariants}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    {actionsContent}
                </motion.div>
            )}
        </motion.div>
    </a>
);
