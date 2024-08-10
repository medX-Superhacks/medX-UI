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
import { useAppSelector } from '@/redux/hooks';
import { useSmartAccountClient } from '@account-kit/react';
import React from 'react';
import toast from 'react-hot-toast';
import { CiCircleCheck } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import ProviderModal from '../provider/Modal';

export function TableComponent() {
    const { address } = useSmartAccountClient({
        type: 'LightAccount',
    });
    const [data, setData] = React.useState([]);
    const fetchDate = async () => {
        const resp: any = await fetchTotalData({
            attester: {
                equals: address,
            },
        });
        setData(resp);
    };
    React.useEffect(() => {
        if (address) {
            fetchDate();
        }
    }, [address]);
    const { leaves, proof, proofFlags } = useAppSelector(
        (state) => state.storeZkProof
    );
    const easID = useAppSelector((state) => state.storeZkProof.easID);
    const handleCopy = (attestationId?: string, zkProof?: any) => {
        const data = { leaves, proof, proofFlags };
        const isDataAvailable =
            data.leaves.length > 0 ||
            data.proof.length > 0 ||
            data.proofFlags.length > 0;
        const targetEasID = isDataAvailable ? easID : attestationId;
        navigator.clipboard
            .writeText(JSON.stringify(isDataAvailable ? data : zkProof))
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
                    const matchExists = data.some(
                        (apiItem: any) => apiItem.recipient === invoice.address
                    );

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
                                {matchExists ? (
                                    <div>
                                        <div className="flex items-center gap-x-4">
                                            {/* <ViewMedicalModal /> */}
                                            <div
                                                className="border-2 rounded-xl px-4 py-2 cursor-pointer"
                                                onClick={() =>
                                                    handleCopy(
                                                        invoice.attestationId,
                                                        invoice.zkProof
                                                    )
                                                }
                                            >
                                                Validate
                                            </div>
                                        </div>
                                        <div className="font-medium justify-center gap-x-1 pt-2 text-sm flex items-center">
                                            Onchain Attested
                                            <CiCircleCheck
                                                color="green"
                                                size={25}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <ProviderModal
                                        name={invoice.name}
                                        age={invoice.age}
                                        gender={invoice.gender}
                                        address={invoice.address}
                                    />
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {invoice.paymentStatus}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
