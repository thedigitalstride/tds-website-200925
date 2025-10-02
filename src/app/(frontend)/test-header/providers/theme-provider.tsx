"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemeProvider
            disableTransitionOnChange
            attribute="class"
            value={{ light: "light-mode", dark: "dark-mode" }}
            defaultTheme="light"
        >
            {children}
        </NextThemeProvider>
    );
}