'use client';
import { invoices } from '@/config';
import React from 'react';

const ViewRecords = () => {
    const data = invoices[3];
    console.log(data);
    return (
        <div className="py-16 flex items-center">
            <div className="w-full max-w-md rounded-xl shadow-xl bg-[#EDF9FC] p-6 border border-[#52D2CF] font-semibold">
                Medical Records
                <div className="py-3">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="font-semibold">
                            Name <div className="font-medium">{data.name}</div>
                        </div>
                        <div className="font-semibold">
                            Age <div className="font-medium">{data.age}</div>
                        </div>{' '}
                        <div className="font-semibold">
                            Gender{' '}
                            <div className="font-medium">{data.gender}</div>
                        </div>
                        <div className="font-semibold">
                            Diagnose{' '}
                            <div className="font-medium">{data.diagnoses}</div>
                        </div>
                        <div className="font-semibold">
                            Blood Type{' '}
                            <div className="font-medium">{data.bloodType}</div>
                        </div>
                    </div>{' '}
                    <div
                        // onClick={() =>
                        //     handleCopyStatic(
                        //         data.docAttestationId || '',
                        //         data.docZkProof
                        //     )
                        // }
                        className="bg-themelinear px-6 py-2 mt-5 w-fit rounded-lg text-white font-semibold flex items-center gap-x-2 cursor-pointer"
                    >
                        Verify
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRecords;
