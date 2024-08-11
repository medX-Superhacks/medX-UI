'use client';
import {
    IDKitWidget,
    VerificationLevel,
    ISuccessResult,
} from '@worldcoin/idkit';
import Image from 'next/image';
import medicalTeam from '../../../public/assets/medicalTeam.png';
import { useRouter } from 'next/navigation';

const WordId = () => {
    const router = useRouter();
    const handleVerify = async (proof: ISuccessResult) => {
        const res = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proof),
        });
        console.log(res);
    };

    const onSuccess = () => {
        router.replace('/healthcare-provider');
    };
    const onError = () => {
        router.replace('/healthcare-provider');
    };
    const app_id: any = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID;
    const action: any = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION;
    return (
        <IDKitWidget
            app_id={app_id}
            action={action}
            verification_level={VerificationLevel.Device}
            handleVerify={handleVerify}
            onSuccess={onSuccess}
            onError={onError}
        >
            {({ open }) => (
                <button
                    className="flex gap-3 capitalize text-sm"
                    onClick={open}
                >
                    {' '}
                    <Image
                        src={medicalTeam}
                        width={25}
                        alt="mediacal team"
                    />{' '}
                    Are you a healthcare provider ?
                </button>
            )}
        </IDKitWidget>
    );
};

export default WordId;
