import { createSlice } from '@reduxjs/toolkit';
type initialStateType = {
    name: string;
    age: number;
    gender: string;
};
const initialState: initialStateType = {
    name: '',
    age: 0,
    gender: '',
};
const createUserData = createSlice({
    name: 'createUserData',
    initialState: initialState,
    reducers: {
        userData: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});
export const { userData } = createUserData.actions;
export default createUserData;
