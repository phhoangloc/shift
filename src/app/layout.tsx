import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../style/global.css'
import '../style/grid.css'
import Provider from "@/redux/component/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shift",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
