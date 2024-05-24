import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Sidebar from "./ui/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Access Control System",
  description: "Access Control System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full">
          <div className="w-3/12">
            <Sidebar />
          </div>
          <div className="w-full p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
