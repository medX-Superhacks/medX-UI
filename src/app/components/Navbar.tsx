'use client';
import { useAccount, useLogout } from '@account-kit/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaPowerOff } from 'react-icons/fa6';
import { RxAvatar, RxExternalLink } from 'react-icons/rx';
import alchemyLogo from '../../../public/assets/alchemy.png';
import { shortenAddress } from '../lib';
import WordId from './wordId';
const Navbar = () => {
    const { address } = useAccount({
        type: 'LightAccount',
    });
    const { logout } = useLogout();

    return (
        <>
            <div className="border-b-2  border-black h-fit px-10">
                <div className="container mx-auto w-full  flex justify-between py-5 ">
                    <Link
                        href={'/home'}
                        className="bg-themelinear  bg-clip-text text-transparent text-4xl font-extrabold"
                    >
                        MedX
                    </Link>

                    {address ? (
                        <div className="flex items-center gap-x-3">
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
                            <Image
                                src={alchemyLogo}
                                alt="alchemyLogo"
                                width={25}
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
