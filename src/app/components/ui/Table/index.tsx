'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './TableComponents';

import { fetchTotalData } from '@/app/lib/query';
import { DOCTOR_PROFILE, invoices } from '@/config';
import { useSmartAccountClient } from '@account-kit/react';
import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import ProviderModal from '../provider/Modal';
import hacHeltcare from '../../../../../public/assets/HcaImg.png';
import usdcLogo from '../../../../../public/assets/usdcLogo.png';
import Image from 'next/image';

export function TableComponent() {
    const [isCreated, setIsCreated] = useState(false);
    const { address } = useSmartAccountClient({
        type: 'LightAccount',
    });

    const fetchDate = async () => {
        const resp: any = await fetchTotalData({
            attester: {
                equals: address,
            },
        });
    };
    React.useEffect(() => {
        if (address) {
            fetchDate();
        }
    }, [address]);

    const Provider_Profile = [
        {
            avatar: <RxAvatar size={80} />,
            name: 'Hac healthcare',
            short_desc: 'Certified Medical Assistant',
            desc: 'Hac healthcare is a dedicated medical assistant at City Health Clinic, assisting patients with various tasks including taking vital signs, patient documentation, and administrative support. He is known for his compassionate care and attention to detail.',
            language: 'US ',
            education: 'Certified Medical Assistant Program, 2020',
            fees: '1',
            hospitals: 'City Health Clinic',
        },
    ];

    return (
        <div className="grid grid-cols-3 mx-10   w-full gap-x-10">
            {Provider_Profile.map(
                (
                    {
                        avatar,
                        name,
                        short_desc,
                        language,
                        desc,
                        education,
                        hospitals,
                        fees,
                    },
                    index
                ) => (
                    <div
                        key={index}
                        className="bg-[#EDF9FC] shadow-lg h-fit rounded-lg p-5"
                    >
                        <div className="flex items-center gap-x-4">
                            {avatar}
                            <div className="text-sm text-gray-600">
                                <div className="text-xl font-semibold">
                                    <Image
                                        src={hacHeltcare}
                                        alt="hacheltcare"
                                        width={80}
                                        className=" backdrop-blur-0"
                                    />
                                </div>
                                <p>{short_desc}</p>
                                <div>{language}</div>
                            </div>
                        </div>
                        <div className="pt-10 font-semibold">
                            <div className="border-b border-gray-300">
                                About
                            </div>
                            <div className="pt-5 text-md text-gray-600">
                                About {name}
                                <p className="text-sm font-normal pt-5">
                                    {desc}
                                </p>
                            </div>
                            <div className="py-5 text-md text-gray-600">
                                Education
                                <p className="text-sm font-normal">
                                    {education}
                                </p>
                            </div>
                            <div className="text-md text-gray-600">
                                Hospital Affiliations
                                <p className="text-sm font-normal">
                                    {hospitals}
                                </p>
                            </div>
                            <div className="text-md  text-gray-600 pt-5">
                                Fees
                                <p className="text-sm font-normal flex gap-1">
                                    {fees}{' '}
                                    <Image
                                        src={usdcLogo}
                                        alt="usdclogo"
                                        width={20}
                                        height={10}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                )
            )}
            <div className=" col-span-2 rounded-lg bg-[#EDF9FC] px-5  shadow-md">
                <Table className="">
                    <TableCaption>A list of your recent records.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S.no</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Medical Record Attestation</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => {
                            return (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">
                                        {invoice.invoice}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-x-2">
                                        <RxAvatar size={30} /> {invoice.name}
                                    </TableCell>
                                    <TableCell>
                                        <div className=" flex items-center gap-x-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                                />
                                            </svg>
                                            {invoice.date}
                                        </div>
                                    </TableCell>

                                    <TableCell className="w-fit flex items-center gap-x-4">
                                        <ProviderModal
                                            name={invoice.name}
                                            age={invoice.age}
                                            gender={invoice.gender}
                                            address={invoice.address}
                                            attestationId={
                                                invoice.attestationId
                                            }
                                            zkProof={invoice.zkProof}
                                            diagnoseVal={invoice.diagnoses}
                                            isCreated={isCreated}
                                            setIsCreated={setIsCreated}
                                        />
                                    </TableCell>
                                    <TableCell className="text-left ">
                                        {invoice.name === 'Alice Johnson' &&
                                        isCreated
                                            ? 'Completed'
                                            : invoice.paymentStatus}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
