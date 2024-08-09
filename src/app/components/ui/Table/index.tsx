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

const invoices = [
    {
        invoice: '1',
        name: 'Alice Johnson',
        paymentStatus: 'Completed',
        date: '2024-08-7',
        totalAmount: '$250.00',
    },
    {
        invoice: '2',
        name: 'Bob Frank',
        paymentStatus: 'Pending',
        date: '2024-08-11',
        totalAmount: '$150.00',
    },
    {
        invoice: '3',
        name: 'Bunny',
        paymentStatus: 'Pending',
        date: '2024-08-15',
        totalAmount: '$350.00',
    },
    {
        invoice: '4',
        name: 'Martin',
        paymentStatus: 'Pending',
        date: '2024-08-21',
        totalAmount: '$450.00',
    },
    {
        invoice: '5',
        name: 'Steve',
        paymentStatus: 'Pending',
        date: '2024-08-22',
        totalAmount: '$550.00',
    },
    {
        invoice: '6',
        name: 'Roman',
        paymentStatus: 'Pending',
        date: '2024-08-25',
        totalAmount: '$200.00',
    },
    {
        invoice: '7',
        name: 'Dwane',
        paymentStatus: 'Pending',
        date: '2024-08-28',
        totalAmount: '$300.00',
    },
];

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
                            <ProviderModal />
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
