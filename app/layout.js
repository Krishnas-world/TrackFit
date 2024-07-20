import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "sonner";
import { getDocs, collection } from 'firebase/firestore';
import { db } from "@/firebaseConfig";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "TrackFit",
  description: "Track your fitness in the most efficient way!",
};

export default async function RootLayout({ children }) {
  const session = await getKindeServerSession();
  const user = session.isAuthenticated ? await session.getUser() : null;
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="md:px-30">
          <Header user = {user} />
          {children}
          <Toaster position="bottom-right" theme="light" />
          <Footer />
        </div>
      </body>
    </html>
  );
}
