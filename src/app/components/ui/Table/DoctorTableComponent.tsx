'use client';
import { invoices } from '@/config';
import { CiCircleCheck } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';
import DoctorModal from '../doctor/doctorModal';
import ViewMedicalModal from '../MedicalModal/ViewMedicalModal';
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
const DoctorTableComponent = () => {
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
        <Table>
            <TableCaption>A list of your recent records.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">S.no</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Consultation On</TableHead>
                    <TableHead>Medical Record</TableHead>
                    <TableHead>Prescription</TableHead>
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
                            <TableCell>
                                <div>
                                    <div className="flex items-center gap-x-4">
                                        <ViewMedicalModal
                                            name={invoice.name}
                                            age={invoice.age}
                                            gender={invoice.gender}
                                            bloodType={invoice.bloodType}
                                            diagnoses={invoice.diagnoses}
                                        />

                                        <div
                                            className="border-2 rounded-xl px-4 py-2 cursor-pointer"
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
                                    <div className="font-medium gap-x-1 pt-2 text-sm flex pl-4">
                                        Onchain Attested
                                        <CiCircleCheck
                                            color="green"
                                            size={25}
                                        />
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="w-fit flex items-center gap-x-4">
                                <DoctorModal
                                    name={invoice.name}
                                    age={invoice.age}
                                    gender={invoice.gender}
                                    attestationId={invoice.attestationId}
                                    docID={invoice.docId}
                                    address={invoice.address}
                                    medication={invoice.medication}
                                    dosage={invoice.dosage}
                                    duration={invoice.duration}
                                />
                            </TableCell>
                            <TableCell className="text-right">
                                {invoice.name === 'Alice Johnson'
                                    ? 'Completed'
                                    : invoice.name === 'Bob Frank'
                                    ? 'Pending'
                                    : invoice.name === 'Bunny'
                                    ? 'Completed'
                                    : invoice.name === 'Martin'
                                    ? 'Pending'
                                    : invoice.paymentStatus}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default DoctorTableComponent;
