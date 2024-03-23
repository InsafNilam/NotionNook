import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NotionNook",
  description:
    "Digital tools specifically designed to help you capture and organize ideas and information easily",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <main className="flex h-screen flex-col items-center justify-between">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
