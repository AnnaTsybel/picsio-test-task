import { ReactNode } from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
    content: ReactNode | null;
    canBeClosed: boolean;
    onClose?: () => void;
    hasOverflow?: boolean;
}

const initialState: ModalsState = {
    content: null,
    canBeClosed: true,
    onClose: () => { },
    hasOverflow: true,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal(state, action: PayloadAction<{ content: ReactNode; canBeClosed: boolean; onClose?: () => void; hasOverflow?: boolean }>) {
            Object.assign(state, action.payload);
        },
        closeModal(state) {
            state.content = null;
        },
    },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
