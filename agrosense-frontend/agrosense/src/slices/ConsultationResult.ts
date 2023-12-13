import { createSlice } from '@reduxjs/toolkit';
import { ConsultationResulState } from '../types';

const initialState: ConsultationResulState = {
    consultationStatus: '',
    mainPest: {
        name: '',
        similarityPercentage: 0,
        solution: [],
    },
    otherPests: [],
};

const consultationResultSlice = createSlice({
    name: 'consultationResult',
    initialState,
    reducers: {
        setConsultationResult: (state, action) => {
            state.consultationStatus = action.payload.consultationStatus;
            state.mainPest = action.payload.mainPest;
            state.otherPests = action.payload.otherPests;
        },
        clearConsultationResult: state => {
            state.consultationStatus = '';
            state.mainPest = {
                name: '',
                similarityPercentage: 0,
                solution: [],
            };
            state.otherPests = [];
        },
    },
});

export default consultationResultSlice;
