'use client';
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
   const pathName = usePathname();
    const hideNavBar = pathName.startsWith('/login') ||
     pathName.startsWith('/signup') ||
     pathName.startsWith('/register') ||
     pathName.startsWith('/submitComplaintForm') ||
     pathName.startsWith('/dashboard')
     ;
  return (
    <html lang="en">
      <body>
        {!hideNavBar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
