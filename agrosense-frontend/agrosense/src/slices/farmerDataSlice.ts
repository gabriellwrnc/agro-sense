import { createSlice } from '@reduxjs/toolkit';
import { FarmerDataState } from '../types';

const initialState: FarmerDataState = {
    _id: '',
    name: '',
    phoneNumber: '',
    firebaseId: '',
    email: '',
    role: '',
};

const farmerDataSlice = createSlice({
    name: 'farmerData',
    initialState,
    reducers: {
        setFarmerData: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.firebaseId = action.payload.firebaseId;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        clearFarmerData: state => {
            state._id = '';
            state.name = '';
            state.phoneNumber = '';
            state.firebaseId = '';
            state.email = '';
            state.role = '';
        },
    },
});

export default farmerDataSlice;
