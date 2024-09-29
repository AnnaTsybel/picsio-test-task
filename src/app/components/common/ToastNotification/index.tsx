import { ToastContainer } from 'react-toastify';

import { PositionsOnPage } from '@app/utils/notifications';

import './index.scss';

export const NOTIFICATION_CLOSE_DELAY = 5000;

/** Custom notification wrapper component around toast notifications. */
export const ToastNotification: React.FC = () => {
    /** Indicates if newest notifications shown in top of queue. */
    const IS_NEWEST_ON_TOP: boolean = false;

    return <ToastContainer
        position={PositionsOnPage.TOP_RIGHT}
        autoClose={NOTIFICATION_CLOSE_DELAY}
        newestOnTop={IS_NEWEST_ON_TOP}
        pauseOnFocusLoss
        pauseOnHover
    />;
};
