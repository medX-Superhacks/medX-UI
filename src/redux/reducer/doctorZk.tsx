import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Leaf {
    type: string;
    name: string;
    value: string | bigint; // Using string or bigint to store BigInt values
    salt: string;
}
interface ZkProofState {
    leaves: Leaf[];
    proof: any[];
    proofFlags: boolean[];
}
const initialState: any = {
    leaves: [],
    proof: [],
    proofFlags: [],
};
const doctorZkProof = createSlice({
    name: 'doctorZkProof',
    initialState,
    reducers: {
        storeDoctorProof: (state, action: PayloadAction<ZkProofState>) => {
            state.leaves = action.payload.leaves.map((leaf) => ({
                ...leaf,
                value:
                    typeof leaf.value === 'bigint'
                        ? leaf.value.toString()
                        : leaf.value,
            }));
            state.proof = action.payload.proof;
            state.proofFlags = action.payload.proofFlags;
        },
    },
});
// Export the action and reducer
export const { storeDoctorProof } = doctorZkProof.actions;
export default doctorZkProof;
