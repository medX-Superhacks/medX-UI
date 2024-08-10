'use client';
import {
    IDKitWidget,
    VerificationLevel,
    ISuccessResult,
} from '@worldcoin/idkit';
import Image from 'next/image';
import medicalTeam from '../../../public/assets/medicalTeam.png';

const WordId = () => {
    const handleVerify = async (proof: ISuccessResult) => {
        const res = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proof),
        });
        if (!res.ok) {
            throw new Error('Verification failed.');
        }
    };

    // TODO: Functionality after verifying
    const onSuccess = () => {
        console.log('Success');
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
