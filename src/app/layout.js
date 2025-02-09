import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const metadata = {
  title: "iNew Tech",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>iNewTech</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider className="flex min-h-screen">
          <div className="fixed top-4 left-4 z-50 lg:hidden">
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SidebarTrigger>
          </div>
          <AppSidebar />
          <main className="flex-1 w-full min-h-screen overflow-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
