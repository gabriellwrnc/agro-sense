import store from '../store';
import { ConsultationPestData } from './Services';

export interface ModalState {
    visible: boolean;
    status: 'success' | 'failed' | 'info' | undefined;
    text: string;
}

export interface FarmerDataState {
    _id: string;
    name: string;
    phoneNumber: string;
    firebaseId: string;
    email: string;
    role: string;
}

export interface ConsultationResulState {
    consultationStatus: string;
    mainPest: ConsultationPestData;
    otherPests: ConsultationPestData[];
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
