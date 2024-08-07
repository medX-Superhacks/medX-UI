'use client';
import { useAccount, useLogout } from '@account-kit/react';
import React from 'react';
import { shortenAddress } from '../lib';
import { RxAvatar } from 'react-icons/rx';
import { FaPowerOff } from 'react-icons/fa6';
import Link from 'next/link';
const HomePage = () => {
    const { address } = useAccount({
        type: 'LightAccount',
    });
    const { logout } = useLogout();
    return (
        <div className="py-10 flex items-center justify-between">
            <div>Medx</div>
            {address ? (
                <div className="flex items-center gap-x-3">
                    <div className="pr-5 underline cursor-pointer">
                        Are you a doctor
                    </div>
                    <RxAvatar size={30} />
                    {shortenAddress(address)}
                    <FaPowerOff
                        className="cursor-pointer"
                        onClick={() => logout()}
                    />
                </div>
            ) : (
                <Link href={'/'}>Login</Link>
            )}
        </div>
    );
};

export default HomePage;
