import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import App from '@app/App';
import 'react-loading-skeleton/dist/skeleton.css';

import './index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <StrictMode>
            <App />
        </StrictMode>,
    </Provider>,
);
