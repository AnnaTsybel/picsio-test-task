import React, { useCallback, useEffect, useMemo } from 'react';

import './index.scss';

export const Pagination: React.FC<{
    limit: number;
    currentSkip: number;
    total: number;
    setSkip: (pageNumber: number) => void;
}> = ({ limit, currentSkip, total, setSkip }) => {
    const generateRange = useMemo(() => (length: number) => Array.from({ length }, (_, index) => ++index), []);
    const DOTS = '...';
    const PAGES_LIMIT = 6;

    const currentPage = currentSkip === 0 ? 1 : currentSkip / limit + 1;

    /** Counts pages number. */
    const pagesCount = useMemo(
        () => Math.ceil(total / limit),
        [total, limit],
    );

    const handlePageChange = useCallback((pageNumber: number) => () => setSkip((Number(pageNumber)-1) *limit), []);

    const paginationRange = useMemo(() => {
        const showLeftDots = currentPage >= 3;
        const showRightDots = pagesCount - currentPage > 2;

        if (PAGES_LIMIT >= pagesCount) {
            return generateRange(pagesCount);
        }

        if (showLeftDots && showRightDots) {
            return [
                1,
                DOTS,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                DOTS,
                pagesCount,
            ];
        }

        if (!showLeftDots && showRightDots) {
            const pages: Array<string | number> = generateRange(4);

            return pages.concat([DOTS, pagesCount]);
        }

        return [
            1,
            DOTS,
            pagesCount - 3,
            pagesCount - 2,
            pagesCount - 1,
            pagesCount,
        ];
    }, [total, limit, currentPage]);

    /** Indicates if current page is first page or last page. */
    const isFirstPageSelected: boolean = currentPage === 1;
    const isLastPageSelected: boolean = currentPage === pagesCount;

    useEffect(() => {
        if (currentPage > pagesCount && pagesCount) {
            setSkip((pagesCount - 1) * limit);
        }
    }, [limit, currentPage, total]);

    return (
        <div className="pagination">
            {total > limit &&

                <div className="pagination__content">
                    <button
                        onClick={handlePageChange(currentPage - 1)}
                        className="pagination__button"
                        disabled={isFirstPageSelected}
                        aria-label="Previous page"
                    >
                        ←
                    </button>
                    <div className="pagination__pages">
                        {paginationRange?.map((page, index) => {
                            if (page === DOTS) {
                                return <span className="pagination__pages__item" key={index}>&#8230;</span>;
                            }

                            return <button
                                key={index}
                                className={`pagination__pages__item ${page === currentPage ? 'active' : ''}`}
                                onClick={handlePageChange(Number(page))}
                            >
                                {page}
                            </button>;
                        })}
                    </div>
                    <button
                        onClick={handlePageChange(currentPage + 1)}
                        className="pagination__button"
                        disabled={isLastPageSelected}
                        aria-label="Next page"
                    >
                        →
                    </button>
                </div>
            }
        </div>
    );
};
