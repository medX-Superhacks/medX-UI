import { ethers } from 'ethers';
const usdcInterface = new ethers.utils.Interface([
    'function transfer(address to, uint256 amount)',
]);
const usdcAddress = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // BaseSepolia USDC contract address
export const encodeUSDCOperation = async (
    recipient: string,
    amount: number
) => {
    // Convert the amount to the smallest unit using scientific notation
    const formattedAmount = ethers.utils.parseUnits(amount.toString(), 6);

    const data = await usdcInterface.encodeFunctionData('transfer', [
        recipient,
        formattedAmount,
    ]);

    return {
        target: usdcAddress,
        data,
    };
};
