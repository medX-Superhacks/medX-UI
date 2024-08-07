'use client';
import { AuthCard, useAccount } from '@account-kit/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const searchId = searchParams.get('orgId');
    const router = useRouter();
    const { address } = useAccount({
        type: 'LightAccount',
    });
    React.useLayoutEffect(() => {
        if (address && searchId) {
            router.replace('/home');
        }
    }, [address, searchId]);
    return (
        <main className="flex min-h-screen  items-center gap-x-4 justify-center text-center">
            <div>Images</div>
            <div className="bg-black rounded-xl p-5">
                <AuthCard />
            </div>
        </main>
    );
}
