import type { Metadata } from "next";
import Header from "@/app/components/Reuseable/Header"
import Footer from "./components/Reuseable/Footer";
import "./globals.css";  
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
