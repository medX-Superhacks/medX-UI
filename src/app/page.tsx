'use client';
import {
    AuthCard,
    useAuthModal,
    useLogout,
    useSignerStatus,
    useUser,
} from '@account-kit/react';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
            <AuthCard />
        </main>
    );
}
