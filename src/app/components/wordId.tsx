'use client';
import {
    IDKitWidget,
    VerificationLevel,
    ISuccessResult,
} from '@worldcoin/idkit';

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
            {({ open }) => <button onClick={open}> Register here</button>}
        </IDKitWidget>
    );
};

export default WordId;
