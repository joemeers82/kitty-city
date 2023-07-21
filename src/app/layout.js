import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kitty City",
  description: "One stop shop for all things kitties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} relative max-w-screen-xl mx-auto`}>
        {children}
      </body>
    </html>
  );
}
