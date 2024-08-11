# 🩺 MedX: NextGen Healthcare On-Chain

![image](https://github.com/user-attachments/assets/2e3bdc98-cc7b-4bcd-b25c-c8121abb9264)


medX is a decentralized healthcare platform designed to securely manage patient records, facilitate cross-chain payments, and ensure trust through verified healthcare providers. By leveraging the power of blockchain, medX brings a new level of security, privacy, and efficiency to the healthcare sector.

## ✨ Features

- **🔐 Secure Patient Onboarding**
  - Social login creates Smart Accounts directly on-chain, ensuring secure identity management.

- **💸 Cross-Chain Payments**
  - Seamless payments on patients' preferred chain, routed to doctors' preferred chain using the CCIP MultiHop Router.

- **🩻 Medical Records Privacy**
  - Medical records securely stored on-chain using zkProofs via Ethereum Account Service (EAS) to maintain privacy.

- **📄 Prescription Management**
  - Doctors can create and attest prescriptions on-chain with gas sponsorship, making the process cost-effective.

- **🔍 Verified Healthcare Providers**
  - World ID verification ensures that only authenticated professionals are part of the medX network.

- **🛡️ Gas Sponsorship**
  - Gas fees for key transactions are sponsored by Alchemy, enhancing accessibility and reducing costs for users.

## 🛠️ Technologies Used

- **Alchemy**
  - **Description**: Alchemy powers several key functionalities within medX, ensuring a seamless and secure user experience across the platform.
  - **Key Features**:
    - **Smart Account Creation**: Automatically creates Smart Accounts on-chain when users sign in with their email, streamlining the onboarding process.
      - **Code Reference**: See [Smart Account creation](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/page.tsx#L88) for the implementation of Smart Account creation using Alchemy.
    - **Sponsored Transactions**: Covers gas fees for all actors in medX—patients, doctors, and healthcare providers—ensuring smooth on-chain attestations and payments without financial friction.
      - **Code Reference**: Check out [Sponser transactions](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/components/ui/doctor/doctorModal.tsx#L135) to see how Alchemy’s sponsored transactions are handled for different actors.

- **Ethereum Account Service (EAS)**
  - **Description**: EAS is integral to medX for ensuring the secure and private management of medical records on-chain.
  - **Key Features**:
    - **Private Schema on Base-Sepolia**: Utilized to ensure that while records are stored on-chain, the privacy of user data is maintained.
      - **Code Reference**:
    - **zkProofs Generation**: Generates zkProofs to ensure that only verified parties can access and view the medical records.
      - **Code Reference**: Check [ZkProof Generation](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/lib/func.tsx) to see how zkProofs are generated and verified.
    - **GraphQL APIs for Attestation Fetching**: Uses EAS service’s GraphQL APIs to fetch relevant attestations and load them on the frontend.
      - **Code Reference**: [GraphQL Github](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/components/ui/doctor/doctorModal.tsx#L146)
 

- **Chainlink CCIP**
  - **Description**: Chainlink's Cross-Chain Interoperability Protocol (CCIP) is crucial for enabling seamless cross-chain payments within medX.
  - **Key Features**:
    - **Creation of CCIP MultiHop Router**: Developed a custom CCIP MultiHop router contract to facilitate cross-chain payments, allowing patients to pay on their preferred chain and doctors to receive payments on theirs.
      - **Code Reference**: The full implementation can be reviewed in the [CCIP-router GitHub Repository](https://github.com/medX-Superhacks/CCIP-router).


- **World ID**
  - **Description**: World ID is integrated into medX to verify the identity of healthcare providers, ensuring that only trusted professionals are part of the platform.
  - **Key Features**:
    - **Provider Verification**: Ensures that doctors and healthcare providers are authenticated during onboarding to maintain the trust and integrity of the platform.
      - **Code Reference**: [World ID integration](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/components/wordId.tsx#L33)

- **Blockscout**
      - **Code Reference**: [Blockscout Payment redirects](https://github.com/medX-Superhacks/medX-UI/blob/2b9afab3a6f0a4780fab07ffba5e5e896b11c7d2/src/app/components/ui/Modal.tsx#L231)

## 📜 Deployed Contracts

### **Medx Single Hop**

Here are the contract addresses for different testnets involved in the medx singlehop functionality:

#### **Sepolia Testnet**
- **Contract Address:** [0x98e7375398DE78FcFA685204D219A1571B888535](https://sepolia.etherscan.io/address/0x98e7375398DE78FcFA685204D219A1571B888535)

#### **Base Sepolia Testnet**
- **Contract Address:** [0xc1ca35997dd2c981c7ade0c73bd8628079fd0a4e](https://base-sepolia.blockscout.com/address/0xc1ca35997dd2c981c7ade0c73bd8628079fd0a4e)

#### **Optimism Sepolia Testnet**
- **Contract Address:** [0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA](https://optimism-sepolia.blockscout.com/address/0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA)

#### **Polygon Amoy Testnet**
- **Contract Address:** [0x7A409A3A36112bd6906a113d9612D7f7e1abd6d4](https://amoy.polygonscan.com/address/0x7A409A3A36112bd6906a113d9612D7f7e1abd6d4)

---

### **CCIP Multichain Hop Router**

The following are the **CCIP Multichain Hop Router** contract addresses deployed across different testnets:

#### **Base Sepolia Testnet**
- **Router Address:** [0x273C282A9f1B45416CB9967611d431C116286ef9](https://base-sepolia.blockscout.com/address/0x273C282A9f1B45416CB9967611d431C116286ef9)

#### **Sepolia Testnet**
- **Router Address:** [0x96EE5fb7bc57C1f03D560Fcb1b8574ddC8bf5F37](https://sepolia.etherscan.io/address/0x96EE5fb7bc57C1f03D560Fcb1b8574ddC8bf5F37)

#### **Optimism Sepolia Testnet**
- **Router Address:** [0xF99b791257ab50be7F235BC825E7d4B83942cf38](https://optimism-sepolia.blockscout.com/address/0xF99b791257ab50be7F235BC825E7d4B83942cf38)

#### **Amoy Testnet**
- **Router Address:** [0x40Fee4c8A3a66Dba113b881Dca0E4B2828b86BB7](https://amoy.polygonscan.com/address/0x40Fee4c8A3a66Dba113b881Dca0E4B2828b86BB7)

#### **Arbitrum Sepolia Testnet**
- **Router Address:** [0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA](https://sepolia-explorer.arbitrum.io/address/0x309222b7833D3D0A59A8eBf9C64A5790bf43E2aA)

---

## **Transaction Examples**

Here are some examples of multi-hop transactions executed across various testnets:

- **Base ➡ Optimism ➡ Amoy**
  - **Transaction:** [CCIP Multi-Hop](https://ccip.chain.link/tx/0xe6e1effa58c4d081159a3fa2d567d52364218f1b748a696adac6ff16732ae02b)

- **Base ➡ Optimism ➡ Sepolia ➡ Amoy**
  - **Transaction Optimism --> Sepolia :** [CCIP Multi-Hop](https://ccip.chain.link/tx/0x1213cfb14f128a2a0468b0b848e9dacb2e8a359364a8b9d16666f7d2a8dc6f53)
  - **Transaction Sepolia --> Amoy :** [CCIP Multi-Hop](https://ccip.chain.link/tx/0xd24a66d5ed53a4bada1fe4bc8a31a22a7867220e8cc652e885834da0fe304bfe)


## 🚀 Future Enhancements

- **🌐 Expansion to More Chains**
  - Broaden support to include additional chains, increasing accessibility and flexibility for users.
  
- **🧑‍⚕️ Enhanced Provider Tools**
  - Develop advanced tools for healthcare providers to manage their practices more effectively on-chain.

- **📈 Advanced Analytics**
  - Integrate analytics for tracking patient outcomes and optimizing healthcare services.

## 📬 Get Involved

Want to contribute or have questions? Reach out to us at [medX Support](mailto:support@medx.com) or join our [Discord Community](#).

---

Built with ❤️ by the medX Team, pushing the boundaries of decentralized healthcare.
