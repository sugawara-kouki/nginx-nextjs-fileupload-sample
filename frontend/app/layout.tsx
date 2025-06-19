import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Upload System",
  description: "Next.js File Upload with TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            // GitHub風のスタイリング
            duration: 4000,
            style: {
              background: '#161b22',
              color: '#f0f6fc',
              border: '1px solid #30363d',
              borderRadius: '6px',
              fontSize: '14px',
              maxWidth: '500px',
            },
            success: {
              iconTheme: {
                primary: '#238636',
                secondary: '#f0f6fc',
              },
            },
            error: {
              iconTheme: {
                primary: '#da3633',
                secondary: '#f0f6fc',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
