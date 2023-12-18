import { configureStore } from '@reduxjs/toolkit';
import {
    consultationResultSlice,
    farmerDataSlice,
    modalSlice,
    userRootNavDetailsSlice,
} from './slices';

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        farmerData: farmerDataSlice.reducer,
        consultationResult: consultationResultSlice.reducer,
        userRootNavdetails: userRootNavDetailsSlice.reducer,
    },
});

export default store;
