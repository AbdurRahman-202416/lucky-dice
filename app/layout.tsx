import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucky Dice 🎲 | Fun Dice Guessing Game",
  description:
    "Play Lucky Dice, a thrilling dice guessing game! Guess the number, roll the dice, score points, and see if you can win before the game is over!",
  keywords:
    "dice game, lucky dice, guessing game, online dice game, play dice, roll dice, fun game, browser game",
  authors: [{ name: "Abdur Rahman", url: "https://abdur-rahman.vercel.app" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
