'use client';
import { DOCTOR_PROFILE, invoices } from '@/config';
import { CiCircleCheck } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import DoctorModal from '../doctor/doctorModal';
import ViewMedicalModal from '../MedicalModal/ViewMedicalModal';
import hcaImage from '../../../../../public/assets/HcaImg.png';
import WldImg from '../../../../../public/assets/world-id-2.png';
import WldLogo from '../../../../../public/assets/worldCoinlogo.png';

import usdcLogo from '../../../../../public/assets/usdcLogo.png';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './TableComponents';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
const DoctorTableComponent = () => {
    const [isCreated, setIsCreated] = useState(false);
    const handleCopyStatic = (attestationId: string, zkProof: any) => {
        const targetEasID = attestationId;
        navigator.clipboard
            .writeText(JSON.stringify(zkProof))
            .then(() => {
                toast.success('Zk proof copied to clipboard');
                toast.loading(
                    'You will be redirected to the external link shortly.'
                );
                setTimeout(() => {
                    toast.dismiss();
                    window.open(
                        `https://base-sepolia.easscan.org/attestation/view/${targetEasID}`,
                        '_blank'
                    );
                }, 5000);
            })
            .catch((err) => {
                toast.error('Failed to copy Zk proof to clipboard');
                console.error('Error copying to clipboard:', err);
            });
    };

    const Provider_Profile = [
        {
            avatar: <RxAvatar size={80} />,
            name: 'john Smith',
            short_desc: 'Certified Medical Assistant',
            desc: 'John Smith is a dedicated medical assistant at City Health Clinic, assisting patients with various tasks including taking vital signs, patient documentation, and administrative support. He is known for his compassionate care and attention to detail.',
            language: 'English, ',
            education: 'Certified Medical Assistant Program, 2020',
            fees: '1',
            hospitals: 'City Health Clinic',
        },
    ];
    return (
        <div className="grid grid-cols-3 mx-9   w-full gap-x-8">
            {DOCTOR_PROFILE.map(
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
                                    {name}
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
            <div className=" col-span-2 rounded-lg  bg-[#EDF9FC] px-5  shadow-md">
                <Table>
                    <TableCaption>A list of your recent records.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">S.no</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Consultation On</TableHead>
                            <TableHead>Medical Record</TableHead>
                            <TableHead>Prescription</TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
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
                                    <TableCell>
                                        <div>
                                            <div className="flex items-center gap-x-2">
                                                <ViewMedicalModal
                                                    name={invoice.name}
                                                    age={invoice.age}
                                                    gender={invoice.gender}
                                                    bloodType={
                                                        invoice.bloodType
                                                    }
                                                    diagnoses={
                                                        invoice.diagnoses
                                                    }
                                                />

                                                <div
                                                    className="border-2 rounded-xl px-2 py-2 cursor-pointer"
                                                    onClick={() =>
                                                        handleCopyStatic(
                                                            invoice.attestationId,
                                                            invoice.zkProof
                                                        )
                                                    }
                                                >
                                                    Verify
                                                </div>
                                            </div>
                                            <div className="font-medium  gap-x-1 pt-2 text-sm flex items-center">
                                                <CiCircleCheck
                                                    color="green"
                                                    size={25}
                                                />
                                                <Image
                                                    src={hcaImage}
                                                    alt="hclHealthcare Image"
                                                    width={40}
                                                />
                                                <div className=" ">
                                                    <Menu>
                                                        <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
                                                            <Image
                                                                src={WldLogo}
                                                                alt="wldCoinlogo"
                                                                width={15}
                                                            />
                                                        </MenuButton>

                                                        <MenuItems
                                                            transition
                                                            anchor="right start"
                                                            className="w-52 origin-top-right rounded-lg border bg-slate-200   text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                                        >
                                                            <MenuItem>
                                                                <button className="group flex w-full  items-center gap-2 rounded-lg py-1 px-3 ">
                                                                    <Image
                                                                        src={
                                                                            WldImg
                                                                        }
                                                                        alt="hclHealthcare Image"
                                                                        width={
                                                                            30
                                                                        }
                                                                    />
                                                                    World id
                                                                    verified
                                                                </button>
                                                            </MenuItem>
                                                        </MenuItems>
                                                    </Menu>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="w-fit flex items-center gap-x-4">
                                        <DoctorModal
                                            name={invoice.name}
                                            age={invoice.age}
                                            gender={invoice.gender}
                                            attestationId={
                                                invoice.attestationId
                                            }
                                            docID={invoice.docId}
                                            address={invoice.address}
                                            medication={invoice.medication}
                                            dosage={invoice.dosage}
                                            duration={invoice.duration}
                                            isCreated={isCreated}
                                            setIsCreated={setIsCreated}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {isCreated &&
                                        invoice.name === 'Bob Frank'
                                            ? '🟢 Completed'
                                            : invoice.name === 'Bob Frank'
                                            ? '🟡 Pending'
                                            : invoice.name === 'Bunny'
                                            ? '🟢 Completed'
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
};

export default DoctorTableComponent;
