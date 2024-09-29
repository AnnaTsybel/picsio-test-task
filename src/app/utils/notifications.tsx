import { toast } from 'react-toastify';
import { ErrorIcon, InfoIcon, SuccessIcon } from '@app/static/images/ToastIcons';

/** Notifications types. I.e, error, info, success */
export enum DesignTypes {
    error = 'error',
    info = 'info',
    success = 'success',
}

/** Notifications position on page. */
export enum PositionsOnPage {
    BOTTOM_CENTER = 'bottom-center',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
}

const NotificationIcons: Record<DesignTypes, React.FC | undefined> = {
    [DesignTypes.success]: SuccessIcon,
    [DesignTypes.error]: ErrorIcon,
    [DesignTypes.info]: InfoIcon,
};

/** Defines notifications plugin with message, toast type and theme. */
export class NotificationsPlugin {
    /** Notifies user. As default type uses error type, and default theme is colored. */
    static notify(message: any, type: DesignTypes = DesignTypes.error) {
        toast[type](message, {
            position: PositionsOnPage.TOP_RIGHT,
            icon: NotificationIcons[type],
        });
    }
}
