import Header from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import Footer from "./_components/Footer";
import AuthContextProvider from "./context/AuthContext";
import { ToastBar } from "react-hot-toast";
import ToasterContext from "./context/ToasterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mosquearoundme",
  description: "Get mosques, events and programs, around you",
  keywords: "ibadah, mosque, salah, prayer, jumah, eid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <AuthContextProvider>
            <Header />
            <main className="p-5 lg:px-32 lg:py-16">
              <ToasterContext />
              {children}
            </main>
            <Footer />
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
