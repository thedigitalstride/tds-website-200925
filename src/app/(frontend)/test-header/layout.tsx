import { Inter } from "next/font/google";
import Link from "next/link";
import { RouteProvider } from "./providers/route-provider";
import { ThemeProvider } from "./providers/theme-provider";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata = {
    title: "UUI Header Test - TDS Website",
    description: "Testing UntitledUI header components",
    robots: "noindex, nofollow",
};

export default function TestHeaderLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="bg-primary antialiased">
                <RouteProvider>
                    <ThemeProvider>
                        {/* Warning Banner */}
                        <div className="bg-yellow-500 text-white p-3 text-center font-semibold sticky top-0 z-50">
                            ⚠️ UUI HEADER TESTING ENVIRONMENT - Not for Production
                        </div>

                        {/* Navigation back to main site */}
                        <nav className="bg-gray-100 border-b p-4">
                            <div className="container mx-auto">
                                <Link href="/" className="text-blue-600 hover:underline">
                                    ← Back to Main TDS Site
                                </Link>
                            </div>
                        </nav>

                        {/* Main Content */}
                        <main className="min-h-screen bg-gray-50">
                            {children}
                        </main>
                    </ThemeProvider>
                </RouteProvider>
            </body>
        </html>
    );
}