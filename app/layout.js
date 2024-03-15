import Header from "./_components/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import AuthContextProvider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import SideMenubar from "./_components/SideMenubar";
import Footer from "./_components/Footer";
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "700"] });
export const metadata = {
  title: "Mosque connect",
  description: "Get mosques, events and programs, around you",
  keywords: "ibadah, mosque, salah, prayer, jumah, eid",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} relative flex flex-col`}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Providers>
          <AuthContextProvider>
            <Header />
            <main className="flex md:pr-10">
              <ToasterContext />
              <SideMenubar />
              <section className="w-full p-2 md:p-10">{children}</section>
            </main>
            <Footer />
            {/* <Sidebar /> */}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
