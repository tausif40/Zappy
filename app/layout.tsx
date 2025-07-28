import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/Providers/theme-provider";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/store/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/Providers/auth-provider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zappy - Magical Memories for Your Little Ones",
  description:
    "Create unforgettable birthday parties and themed events for kids with professional vendors and curated experiences.",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
              <AntdRegistry >
                <main >{children}</main>
                <Toaster />
                <Footer />
              </AntdRegistry>
            </ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
