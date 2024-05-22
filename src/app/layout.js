import { Inter } from "next/font/google";
import Providers from "@/utils/theme/providers";
import "@/app/globals.css";
import RecoilRootProvider from "@/utils/recoil/RecoilRootProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SKKLUB ADMIN",
  description: "SKKUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RecoilRootProvider>
          <Providers>{children}</Providers>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
