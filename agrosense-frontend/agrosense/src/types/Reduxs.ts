import store from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ModalState {
    visible: boolean;
    status: 'success' | 'failed' | 'info' | undefined;
    text: string;
}