const { ethers } = require("ethers");
import pkg from '@ethereum-attestation-service/eas-sdk';
const { PrivateData, SchemaEncoder } = pkg;

// EAS contract address
const easContractAddress = "0x4200000000000000000000000000000000000021";

// Define the ABI fragment for the attest function
const easInterface = new ethers.utils.Interface([
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "schema",
            "type": "bytes32"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
              },
              {
                "internalType": "uint64",
                "name": "expirationTime",
                "type": "uint64"
              },
              {
                "internalType": "bool",
                "name": "revocable",
                "type": "bool"
              },
              {
                "internalType": "bytes32",
                "name": "refUID",
                "type": "bytes32"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "internalType": "struct AttestationRequestData",
            "name": "data",
            "type": "tuple"
          }
        ],
        "internalType": "struct AttestationRequest",
        "name": "request",
        "type": "tuple"
      }
    ],
    "name": "attest",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]);

// Schema UID for prescription
const schemaUID = '0x20351f973fdec1478924c89dfa533d8f872defa108d9c3c6512267d7e7e5dbc2';

/**
 * Create and encode an attestation for a medical record.
 * @param {string} name - The name of the patient.
 * @param {number} age - The age of the patient.
 * @param {boolean} isInsured - Insurance status of the patient.
 * @param {string} diagnosis - The diagnosis of the patient.
 * @param {bytes32} refUID - The reference UID for the attestation.
 * @param {string} recipient - The recipient address.
 * @returns {object} An object containing the target contract address, encoded data, and value.
 */
export const createMedicalRecordAttestation = (name, age, isInsured, diagnosis, refUID, recipient) => {
  // Create private data for the medical record
  const privateData = new PrivateData([
    { type: 'string', name: 'name', value: name },
    { type: 'uint256', name: 'age', value: age },
    { type: 'bool', name: 'isInsured', value: isInsured },
    { type: 'string', name: 'diagnosis', value: diagnosis }
  ]);

  // Get the full tree for the medical record
  const fullTreeMedicalRecord = privateData.getFullTree();

  // Encode the medical record data using the SchemaEncoder
  const schemaEncoderMedicalRecord = new SchemaEncoder('bytes32 privateData');
  const encodedDataMedicalRecord = schemaEncoderMedicalRecord.encodeData([{ name: 'privateData', value: fullTreeMedicalRecord.root, type: 'bytes32' }]);

  // Prepare the attestation data
  const attestationData = {
    schema: schemaUID,
    data: {
      recipient,
      expirationTime: 0,
      revocable: true,
      refUID: refUID || ethers.constants.HashZero, // Use provided refUID or default to HashZero
      data: encodedDataMedicalRecord,
    }
  };

  // Encode the function call data using the interface
  const data = easInterface.encodeFunctionData("attest", [attestationData]);

  return {
    target: easContractAddress, // Return the EAS contract address
    data, // Encoded data for the transaction
    value: 0n, // Attestation does not require ETH to be sent
  };
};

/**
 * Generate a multi-proof for a medical record.
 * @param {Array<number>} proofIndexes - Array of indexes for the fields to selectively reveal.
 * @returns {object} The multi-proof generated for the selective reveal of the medical record.
 */
export const generateProofMedicalRecord = (proofIndexes) => {
  const multiProof = privateData.generateMultiProof(proofIndexes);
  console.log('Multi-proof for selective reveal (Medical Record):', multiProof);
  return multiProof;
};

/**
 * Create and encode an attestation for a prescription.
 * @param {string} prescriptionId - The ID of the prescription.
 * @param {string} medication - The name of the medication.
 * @param {string} dosage - The dosage instructions.
 * @param {string} duration - The duration of the prescription.
 * @param {bytes32} refUID - The reference UID for the attestation.
 * @param {string} recipient - The recipient address.
 * @returns {object} An object containing the target contract address, encoded data, and value.
 */
export const createPrescriptionAttestation = (prescriptionId, medication, dosage, duration, refUID, recipient) => {
  // Create private data for the prescription
  const privateData = new PrivateData([
    { type: 'string', name: 'prescriptionId', value: prescriptionId },
    { type: 'string', name: 'medication', value: medication },
    { type: 'string', name: 'dosage', value: dosage },
    { type: 'string', name: 'duration', value: duration }
  ]);

  // Get the full tree for the prescription
  const fullTreePrescription = privateData.getFullTree();

  // Encode the prescription data using the SchemaEncoder
// Create an attestation with the Merkle root and reference the medical record attestation
const schemaEncoderPrescription = new SchemaEncoder('bytes32 privateData');
const encodedDataPrescription = schemaEncoderPrescription.encodeData([{ name: 'privateData', value: fullTreePrescription.root, type: 'bytes32' }]);


  // Prepare the attestation data
  const attestationData = {
    schema: schemaUID,
    data: {
      recipient,
      expirationTime: 0,
      revocable: true,
      refUID: refUID || ethers.constants.HashZero, // Use provided refUID or default to HashZero
      data: encodedDataPrescription,
      value: 0n // No value needed for this transaction
    }
  };

  // Encode the function call data using the interface
  const data = easInterface.encodeFunctionData("attest", [attestationData]);

  return {
    target: easContractAddress, // Return the EAS contract address
    data, // Encoded data for the transaction
    value: 0n, // Attestation does not require ETH to be sent
  };
};

/**
 * Generate a multi-proof for a prescription.
 * @param {Array<number>} proofIndexes - Array of indexes for the fields to selectively reveal.
 * @returns {object} The multi-proof generated for the selective reveal of the prescription.
 */
export const generateProofPrescription = (proofIndexes) => {
  const multiProof = privateData.generateMultiProof(proofIndexes);
  console.log('Multi-proof for selective reveal (Prescription):', multiProof);
  return multiProof;
};
