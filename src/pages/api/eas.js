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

/**
 * Create and encode an attestation for a medical record.
 * @param {string} name - The name of the patient.
 * @param {number} age - The age of the patient.
 * @param {boolean} isInsured - Insurance status of the patient.
 * @param {string} diagnosis - The diagnosis of the patient.
 * @param {bytes32} refUID - The reference UID for the attestation.
 * @param {string} recipient - The recipient address.
 * @param {BigInt} value - The value associated with the attestation.
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
  const schemaEncoder = new SchemaEncoder(schemaUIDMedicalRecord);
  const encodedDataMedicalRecord = schemaEncoder.encodeData(fullTreeMedicalRecord);

  // Prepare the attestation data
  const attestationData = {
    schema: schemaUIDMedicalRecord,
    data: {
      recipient,
      expirationTime: 0,
      revocable: true,
      refUID: refUID || ethers.constants.HashZero, // Use provided refUID or default to HashZero
      data: encodedDataMedicalRecord,
      value: value || 0n // Use provided value or default to 0n
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
