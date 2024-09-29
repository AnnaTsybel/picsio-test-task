import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

import { Modal } from '@components/common/Modal';
import { ToastNotification } from '@components/common/ToastNotification';

import { Routes } from '@app/routes';

const App = () => {
    return (
        <SkeletonTheme baseColor="#fff" highlightColor="#9f9f9f">
            <ToastNotification />
            <Modal />
            <BrowserRouter basename="/">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes />
                </Suspense>
            </BrowserRouter >
        </SkeletonTheme>
    );
};

export default App;
