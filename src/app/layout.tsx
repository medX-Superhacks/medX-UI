import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { config } from './config';
import { headers } from 'next/headers';
import { cookieToInitialState } from '@account-kit/core';
import Navbar from './components/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'medX',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(
        config,
        headers().get('cookie') ?? undefined
    );
    return (
        <html lang="en">
            <body className={`${inter.className}  text-black`}>
                <Navbar />
                <Providers initialState={initialState}>{children}</Providers>
            </body>
        </html>
    );
}
