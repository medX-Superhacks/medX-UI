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

    return (
        <IDKitWidget
            app_id="app_staging_62f680c2d99158b6224e1be22d651fe6"
            action="medx-onboarding"
            verification_level={VerificationLevel.Device}
            handleVerify={handleVerify}
            onSuccess={onSuccess}
        >
            {({ open }) => <button onClick={open}> Register here</button>}
        </IDKitWidget>
    );
};

export default WordId;
