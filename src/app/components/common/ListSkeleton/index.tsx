import Skeleton from 'react-loading-skeleton';

import './index.scss';

type ListSkeletonProps = {
    listsToRender: number;
    height?: number;
    gap?: number;
    borderRadius?: number;
};

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
    listsToRender,
    height = 100,
    gap = 15,
    borderRadius = 20,
}) =>
    <div className="list-skeleton" style={{ rowGap: gap }}>
        {Array(listsToRender)
            .fill(1)
            .map((_, index) =>
                <Skeleton key={index} height={height} borderRadius={borderRadius} />
            )}
    </div>;
