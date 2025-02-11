import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Access Control System",
  description: "Access Control System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="flex w-full">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NextUIProvider className="w-full h-screen">
              <div className="w-full h-full">{children}</div>
            </NextUIProvider>
          </NextIntlClientProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
