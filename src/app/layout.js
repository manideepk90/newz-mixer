import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/navbar";

const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "./lib/authContext";

export const metadata = {
  title: "Zacker News",
  description:
    "Zacker News is a app where you can explore latest updates technology and business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
