import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import { closeModal } from '@store/modals/slice';

import './index.scss';

export const Modal = () => {
    const dispatch = useAppDispatch();
    const { content, canBeClosed, onClose, hasOverflow } = useAppSelector(state => state.modals);

    const removeModal = () => {
        if (!canBeClosed) { return; }

        dispatch(closeModal());
        onClose && onClose();
    };

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const body = document.getElementsByTagName('body');
        content ?
            Array.from(body)[0].className = 'scroll-disable'
            :
            Array.from(body)[0].className = '';
    }, [content]);

    return (
        <>
            {content &&
                <div className="modal" onClick={removeModal} >
                    <div className={`modal__content ${hasOverflow ? 'overflow' : ''}`} onClick={stopPropagation}>
                        {content}
                    </div>
                </div>
            }
        </>
    );
};
