import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a single leaf
interface Leaf {
    type: string;
    name: string;
    value: string | bigint; // Using string or bigint to store BigInt values
    salt: string;
}

// Define the initial state type
interface ZkProofState {
    leaves: Leaf[];
    proof: any[];
    proofFlags: boolean[];
    easID: string; // New state property for easID
}

// Initial state
const initialState: ZkProofState = {
    leaves: [],
    proof: [],
    proofFlags: [],
    easID: '', // Initialize easID
};

// Create the slice
const storeZkProof = createSlice({
    name: 'storeZkProof',
    initialState,
    reducers: {
        storeProof: (state, action: PayloadAction<ZkProofState>) => {
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
        setEasID: (state, action: PayloadAction<string>) => {
            state.easID = action.payload;
        },
    },
});

// Export the action and reducer
export const { storeProof, setEasID } = storeZkProof.actions;
export default storeZkProof;
