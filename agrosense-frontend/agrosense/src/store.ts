import { configureStore } from '@reduxjs/toolkit';
import { consultationResultSlice, farmerDataSlice, modalSlice } from './slices';

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        farmerData: farmerDataSlice.reducer,
        consultationResult: consultationResultSlice.reducer,
    },
});

export default store;
