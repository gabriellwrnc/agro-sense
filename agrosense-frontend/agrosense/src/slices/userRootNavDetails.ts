import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserRootNavDetailsState } from '../types';

const initialState: UserRootNavDetailsState = {
    isLoggedIn: false,
    role: '',
};

const userRootNavDetailsSlice = createSlice({
    name: 'userRootNavDetails',
    initialState,
    reducers: {
        setLoggedIn: (
            state,
            action: PayloadAction<{
                isLoggedIn: boolean;
                role: string;
            }>,
        ) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.role = action.payload.role;
        },
        loggedOut: state => {
            state.isLoggedIn = false;
            state.role = '';
        },
    },
});

export default userRootNavDetailsSlice;
