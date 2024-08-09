import { ethers } from "ethers";

// Constants for the USDC contract
const usdcAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // BaseSepolia USDC contract address

const usdcInterface = new ethers.utils.Interface([
  "function transfer(address to, uint256 amount)"
]);

/**
 * Encode data for transferring USDC.
 * @param {string} recipient - The address of the recipient.
 * @param {number} amount - The amount of USDC to transfer, as a multiple of 1e6.
 * @returns {object} An object containing the target contract address and the encoded data.
 */
export const encodeUSDCOperation = (recipient, amount) => {
  // Convert the amount to the smallest unit using scientific notation
  const formattedAmount = ethers.utils.parseUnits(amount.toString(), 6);
  const data = usdcInterface.encodeFunctionData("transfer", [recipient, formattedAmount]);
  return {
    target: usdcAddress,
    data,
    value: 0n, // USDC transfer does not require ETH to be sent
  };
};
