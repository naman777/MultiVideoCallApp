import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WebSocketProvider } from "@/hooks/useSocket";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MultiMeet",
  description: "Made with ❤️ by Naman Kundra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={true} />
        <WebSocketProvider>{children}</WebSocketProvider>
      </body>
    </html>
  );
}
