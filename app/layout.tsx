import type { Metadata } from "next"; 
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import BootstrapClient from "./components/bootstrap/bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

  
export const metadata: Metadata = {
  title: "VRV Administrator !",
  description: "Generated by requester....",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <SessionWrapper>
      <body  className="bg-theme bg-theme3 nunito-body">
        <ToastContainer position="top-right" />
        {children}
        <BootstrapClient />

      </body>
      </SessionWrapper>
    </html>
  );
}
