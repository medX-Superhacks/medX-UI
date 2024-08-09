import {
    useSendUserOperation,
    useSmartAccountClient,
} from '@account-kit/react';
import { Button } from '@headlessui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { encodeUSDCOperation } from '../lib/func';

const chains = [
    {
        title: 'Optimism',
    },
    {
        title: 'Base',
    },
    {
        title: 'Eth',
    },
];
const Payment = ({
    setCurrentState,
}: {
    setCurrentState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [loading, setLoading] = React.useState(false);
    const { client } = useSmartAccountClient({
        type: 'LightAccount',
    });
    const { sendUserOperation } = useSendUserOperation({
        client,
        // optional parameter that will wait for the transaction to be mined before returning
        waitForTxn: true,
        onSuccess: ({ hash, request }) => {
            setLoading(false);
            setCurrentState(3);
        },
        onError: (error) => {
            setLoading(false);
            toast.error('Something went wrong');
        },
    });
    const handleSubmit = async () => {
        setLoading(true);

        const resp = await encodeUSDCOperation(
            '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9',
            0.0001
        );
        if (resp.data && resp.target) {
            const sender: any = {
                target: resp.target,
                data: resp.data,
            };
            sendUserOperation({
                uo: sender,
            });
        }
    };

    return (
        <div className="pt-5">
            <div>Fees - 500</div>
            <div className="py-3">Chains</div>
            <div className="flex items-center gap-x-4">
                {chains.map((elem, index) => (
                    <div
                        key={index}
                        className="border-2 rounded-xl px-3 cursor-pointer"
                    >
                        {elem.title}
                    </div>
                ))}
            </div>
            {loading ? (
                <div className="text-center mt-10 bg-green-200 px-5 py-2  w-full rounded-lg">
                    Processing payment...
                </div>
            ) : (
                <Button
                    className="mt-10 bg-green-200 px-5 py-2  w-full rounded-lg"
                    onClick={() => handleSubmit()}
                >
                    Pay
                </Button>
            )}
        </div>
    );
};

export default Payment;
