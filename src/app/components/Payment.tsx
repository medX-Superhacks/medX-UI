import {
    useSendUserOperation,
    useSmartAccountClient,
} from '@account-kit/react';
import { Button } from '@headlessui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { encodeUSDCOperation } from '../lib/func';
import usdcLogo from '../../../public/assets/usdcLogo.png';
import optimismLogo from '../../../public/assets/optimismLogo.png';
import baseLogo from '../../../public/assets/baseLogo.svg';
import ethereumLogo from '../../../public/assets/ethereumLogo.png';
import Image from 'next/image';
const chains = [
    {
        logo: optimismLogo,
        title: 'Optimism',
    },
    {
        logo: baseLogo,
        title: 'Base',
    },
    {
        logo: ethereumLogo,
        title: 'ethereum ',
    },
];
const Payment = ({
    setBlockLink,
    setCurrentState,
}: {
    setBlockLink: React.Dispatch<React.SetStateAction<string>>;
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
            setBlockLink(hash);
            setLoading(false);
            setCurrentState(3);
        },
        onError: (error) => {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong');
        },
    });
    const handleSubmit = async () => {
        setLoading(true);

        const resp = await encodeUSDCOperation(
            '0x0F284B92d59C8b59E11409495bE0c5e7dBe0dAf9', //TODO change the addr
            1
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
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleClick = (index: any) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };
    return (
        <div className="pt-5">
            <div className="flex gap-2">
                Fees 1
                <Image src={usdcLogo} alt="usdclogo" width={25} height={5} />
            </div>
            <div className="py-3">Chains</div>
            <div className="flex items-center gap-x-4">
                {chains.map((elem, index) => (
                    <div key={index} className="flex cursor-pointer">
                        <button
                            className={`group relative inline-flex items-center justify-center h-7 ${
                                selectedIndex === index ? 'w-24' : 'w-7'
                            } overflow-hidden rounded-full bg-gradient-to-t from-[#73c7c4] to-[#7ee3e0] font-medium text-white transition-all duration-300`}
                            onClick={() => handleClick(index)}
                        >
                            <p
                                className={`inline-flex whitespace-nowrap text-xs transition-all duration-200 ${
                                    selectedIndex === index
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 group-hover:-translate-x-2.5 group-hover:opacity-100'
                                }`}
                            >
                                {elem.title}
                            </p>
                            <div className="absolute right-1 rounded-full border-[#3aafab] border">
                                <Image
                                    src={elem.logo}
                                    alt="chainLogo"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </button>
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
