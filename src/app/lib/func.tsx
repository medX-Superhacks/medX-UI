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
    const multiProof = privateData.generateMultiProof([0, 1, 2, 3]);
    console.log(
        'Multi-proof for selective reveal (Medical Record):',
        multiProof
    );

    return {
        data: transaction.data,
        zkProofMedicalRecord: multiProof,
    };
};

export const createPrescriptionAttestation = async (
    prescriptionId: string,
    medication: string,
    dosage: string,
    duration: string,
    recipient: string,
    signer: any,
    refUID: string = ethers.constants.HashZero // Default to HashZero if not provided
) => {
    const eas = new EAS(easContractAddress);
    eas.connect(signer);

    // Create private data for the prescription
    const privateData = new PrivateData([
        { type: 'string', name: 'prescriptionId', value: prescriptionId },
        { type: 'string', name: 'medication', value: medication },
        { type: 'string', name: 'dosage', value: dosage },
        { type: 'string', name: 'duration', value: duration },
    ]);

    // Get the full tree for the prescription
    const fullTreePrescription = privateData.getFullTree();

    // Encode the prescription data using the SchemaEncoder
    const schemaEncoderPrescription = new SchemaEncoder('bytes32 privateData');
    const encodedDataPrescription = schemaEncoderPrescription.encodeData([
        {
            name: 'privateData',
            value: fullTreePrescription.root,
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
            refUID,
            data: encodedDataPrescription,
        },
    };

    const transaction = await eas.attest(attestationData);
    const multiProof = privateData.generateMultiProof([0, 1, 2, 3]);
    console.log('Multi-proof for selective reveal (Prescription):', multiProof);

    return {
        data: transaction.data,
        zkProofPrescription: multiProof,
    };
};
