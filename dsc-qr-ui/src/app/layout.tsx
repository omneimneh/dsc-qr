import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import Providers from "@/app/Providers";

const poppins = Poppins({subsets: ["latin"], weight: ["300", "400", "700"]});

export const metadata: Metadata = {
    title: "Surveys | Dubai Sports Council",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={poppins.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
