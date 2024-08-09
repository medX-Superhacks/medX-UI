import {
    EAS,
    PrivateData,
    SchemaEncoder,
} from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers5';
const usdcInterface = new ethers.utils.Interface([
    'function transfer(address to, uint256 amount)',
]);

// EAS contract address
const easContractAddress = '0x4200000000000000000000000000000000000021';
const schemaUID =
    '0x20351f973fdec1478924c89dfa533d8f872defa108d9c3c6512267d7e7e5dbc2';
const usdcAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // BaseSepolia USDC contract address

export const encodeUSDCOperation = (recipient: string, amount: number) => {
    // Convert the amount to the smallest unit using scientific notation
    const formattedAmount = ethers.utils.parseUnits(amount.toString(), 6);

    const data = usdcInterface.encodeFunctionData('transfer', [
        recipient,
        formattedAmount,
    ]);

    return {
        target: usdcAddress,
        data,
    };
};

export const createMedicalRecordAttestation = async (
    name: string,
    age: number,
    isInsured: boolean,
    diagnosis: string,
    recipient: string,
    signer: any
) => {
    const eas = new EAS(easContractAddress);
    eas.connect(signer);
    // Create private data for the medical record
    const privateData = new PrivateData([
        { type: 'string', name: 'name', value: name },
        { type: 'uint256', name: 'age', value: age },
        { type: 'bool', name: 'isInsured', value: isInsured },
        { type: 'string', name: 'diagnosis', value: diagnosis },
    ]);

    // Get the full tree for the medical record
    const fullTreeMedicalRecord = privateData.getFullTree();

    // Encode the medical record data using the SchemaEncoder
    const schemaEncoderMedicalRecord = new SchemaEncoder('bytes32 privateData');

    const encodedDataMedicalRecord = schemaEncoderMedicalRecord.encodeData([
        {
            name: 'privateData',
            value: fullTreeMedicalRecord.root,
            type: 'bytes32',
        },
    ]);

    // Prepare the attestation data
    const attestationData: any = {
        schema: schemaUID,
        data: {
            recipient,
            expirationTime: 0,
            revocable: true,
            data: encodedDataMedicalRecord,
        },
    };

    const transaction = await eas.attest(attestationData);
    return {
        data: transaction.data,
    };
};
