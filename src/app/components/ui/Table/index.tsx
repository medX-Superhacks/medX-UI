import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from './TableComponents';

import ProviderModal from '../provider/Modal';
import { invoices } from '@/config';

export function TableComponent() {
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
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                            {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.name}</TableCell>
                        <TableCell>{invoice.date}</TableCell>

                        <TableCell className="w-fit flex items-center gap-x-4">
                            <ProviderModal
                                name={invoice.name}
                                age={invoice.age}
                                gender={invoice.gender}
                                address={invoice.address}
                            />
                        </TableCell>
                        <TableCell className="text-right">
                            {invoice.paymentStatus}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
