'use client';
import { invoices } from '@/config';
import React from 'react';
import toast from 'react-hot-toast';

const ViewRecords = () => {
    const data = invoices[3];
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
    return (
        <>
            <div className="py-16 flex items-center gap-x-12">
                <div className="w-full max-w-md rounded-xl shadow-xl bg-[#EDF9FC] p-6 border border-[#52D2CF] font-semibold">
                    Medical Records
                    <div className="py-3">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="font-semibold">
                                Name{' '}
                                <div className="font-medium">{data.name}</div>
                            </div>
                            <div className="font-semibold">
                                Age{' '}
                                <div className="font-medium">{data.age}</div>
                            </div>{' '}
                            <div className="font-semibold">
                                Gender{' '}
                                <div className="font-medium">{data.gender}</div>
                            </div>
                            <div className="font-semibold">
                                Diagnose{' '}
                                <div className="font-medium">
                                    {data.diagnoses}
                                </div>
                            </div>
                            <div className="font-semibold">
                                Blood Type{' '}
                                <div className="font-medium">
                                    {data.bloodType}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                handleCopyStatic(
                                    data.attestationId,
                                    data.zkProof
                                )
                            }
                            className="bg-themelinear px-6 py-2 mt-5 w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
                        >
                            Verify
                        </div>
                    </div>
                </div>
                <div className="w-full h-[350px]  max-w-md rounded-xl shadow-xl bg-[#EDF9FC] p-6 border border-[#52D2CF] font-semibold">
                    Doctor Records
                    <div className="py-3">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="font-semibold">
                                Medication{' '}
                                <div className="font-medium">
                                    {data.medication}
                                </div>
                            </div>
                            <div className="font-semibold">
                                Dosage{' '}
                                <div className="font-medium">{data.dosage}</div>
                            </div>{' '}
                            <div className="font-semibold">
                                Duration{' '}
                                <div className="font-medium">
                                    {data.duration}
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                handleCopyStatic(
                                    data.docAttestationId || '',
                                    data.docZkProof
                                )
                            }
                            className="mt-20 bg-themelinear px-6 py-2  w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
                        >
                            Verify
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-center">
                As per diagnoses 6 months is required*
            </p>
            <div className="text-center mx-auto bg-themelinear px-6 py-2 mt-5 w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer">
                Start Treatment
            </div>
        </>
    );
};

export default ViewRecords;
