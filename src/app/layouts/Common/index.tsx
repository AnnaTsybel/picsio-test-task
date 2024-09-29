import { Navigation } from '../../components/common/Navigation';
import './index.scss';

export const CommonLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="page">
            <Navigation />
            <main className="page__main">
                {children}
            </main>
        </div>
    );
};
