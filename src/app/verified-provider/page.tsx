'use client';
import React from 'react';
import { TableComponent } from '../components/ui/Table';
import { fetchTotalData } from '../lib/query';
import { useSmartAccountClient } from '@account-kit/react';

const VerifiedProvider = () => {
    const { address } = useSmartAccountClient({
        type: 'LightAccount',
    });

    const fetchDate = async () => {
        const resp = await fetchTotalData({
            attester: {
                equals: address,
            },
        });
        console.log(resp);
    };
    React.useEffect(() => {
        if (address) {
            fetchDate();
        }
    }, [address]);
    return (
        <div className="py-10 flex items-center justify-between">
            <TableComponent />
        </div>
    );
};

export default VerifiedProvider;
