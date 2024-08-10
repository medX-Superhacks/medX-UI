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
import { invoices } from '@/config';
import { useSmartAccountClient } from '@account-kit/react';
import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import ProviderModal from '../provider/Modal';

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

    return (
        <Table>
            <TableCaption>A list of your recent records.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S.no</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Medical Record Attestation</TableHead>
                    <TableHead className="text-right">Status</TableHead>
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
                            <TableCell>{invoice.date}</TableCell>

                            <TableCell className="w-fit flex items-center gap-x-4">
                                <ProviderModal
                                    name={invoice.name}
                                    age={invoice.age}
                                    gender={invoice.gender}
                                    address={invoice.address}
                                    attestationId={invoice.attestationId}
                                    zkProof={invoice.zkProof}
                                    diagnoseVal={invoice.diagnoses}
                                    isCreated={isCreated}
                                    setIsCreated={setIsCreated}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                {invoice.name === 'Alice Johnson' && isCreated
                                    ? 'Completed'
                                    : invoice.paymentStatus}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
