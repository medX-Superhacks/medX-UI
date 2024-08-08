'use client';
import { useAccount, useLogout } from '@account-kit/react';
import React, { useState } from 'react';
import { RxExternalLink } from 'react-icons/rx';
import { RxAvatar } from 'react-icons/rx';
import { shortenAddress } from '../lib';
import { FaPowerOff } from 'react-icons/fa6';
import Link from 'next/link';
import toast from 'react-hot-toast';
import WordId from './wordId';
const Navbar = () => {
    const { address } = useAccount({
        type: 'LightAccount',
    });
    const { logout } = useLogout();

    return (
        <>
            <div className="border-b-2 border border-black h-fit">
                <div className="container mx-auto w-full  flex justify-between py-5 ">
                    <Link
                        href={'/'}
                        className="bg-themelinear  bg-clip-text text-transparent text-4xl font-extrabold"
                    >
                        MedX
                    </Link>

                    {address ? (
                        <div className="flex items-center gap-x-3">
                            Are you a provider/doctor ?
                            <span className="cursor-pointer text-[#157D7A] hover:underline ">
                                <WordId />
                      
                            </span>
                            <RxAvatar size={30} />
                            <div
                                className="cursor-pointer hover:underline"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        address as string
                                    );
                                    toast.success(
                                        'Address copied to clipboard'
                                    );
                                }}
                            >
                                {shortenAddress(address)}
                            </div>
                            <FaPowerOff
                                className="cursor-pointer"
                                onClick={() => logout()}
                            />
                        </div>
                    ) : (
                        <div className="bg-themelinear px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer">
                            Book Appointment <RxExternalLink />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
