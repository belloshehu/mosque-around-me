import Header from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import Footer from "./_components/Footer";
import AuthContextProvider from "./context/AuthContext";
import { ToastBar } from "react-hot-toast";
import ToasterContext from "./context/ToasterContext";
import Sidebar from "./_components/Sidebar";
import SideMenubar from "./_components/SideMenubar";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Mosque around me",
  description: "Get mosques, events and programs, around you",
  keywords: "ibadah, mosque, salah, prayer, jumah, eid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative flex flex-col`}>
        <Providers>
          <AuthContextProvider>
            {/* <Header /> */}
            <ToasterContext />
            <main className="flex">
              <SideMenubar />
              <section className="w-full">{children}</section>
            </main>
            {/* <Footer /> */}
            <Sidebar />
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
