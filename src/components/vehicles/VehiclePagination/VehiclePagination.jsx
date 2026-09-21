import {
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";

import styles from "./VehiclePagination.module.css";

const VehiclePagination = ({
    pagination = {},
    onPageChange,
    maxVisiblePages = 5
}) => {
    const {
        page = 1,
        pages = 1,
        total = 0,
        hasNextPage = page < pages,
        hasPreviousPage = page > 1
    } = pagination;

    const currentPage = Number(page) || 1;
    const totalPages = Number(pages) || 1;

    if (totalPages <= 1 || total <= 0) {
        return null;
    }

    const getPageNumbers = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }

        const visiblePages = [];
        const half = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(
            2,
            currentPage - half
        );

        let endPage = Math.min(
            totalPages - 1,
            currentPage + half
        );

        if (currentPage <= half + 1) {
            startPage = 2;
            endPage = maxVisiblePages - 1;
        }

        if (
            currentPage >=
            totalPages - half
        ) {
            startPage =
                totalPages -
                maxVisiblePages +
                2;

            endPage = totalPages - 1;
        }

        visiblePages.push(1);

        if (startPage > 2) {
            visiblePages.push("left-ellipsis");
        }

        for (
            let pageNumber = startPage;
            pageNumber <= endPage;
            pageNumber += 1
        ) {
            visiblePages.push(pageNumber);
        }

        if (endPage < totalPages - 1) {
            visiblePages.push("right-ellipsis");
        }

        visiblePages.push(totalPages);

        return visiblePages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageChange = (nextPage) => {
        if (
            nextPage === currentPage ||
            nextPage < 1 ||
            nextPage > totalPages
        ) {
            return;
        }

        onPageChange?.(nextPage);
    };

    const handlePrevious = () => {
        if (!hasPreviousPage) {
            return;
        }

        handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (!hasNextPage) {
            return;
        }

        handlePageChange(currentPage + 1);
    };

    return (
        <nav
            className={styles.pagination}
            aria-label="Vehicle inventory pagination"
        >
            <button
                type="button"
                className={styles.navigationButton}
                onClick={handlePrevious}
                disabled={!hasPreviousPage}
                aria-label="Go to previous page"
            >
                <FiChevronLeft
                    aria-hidden="true"
                />

                <span>Previous</span>
            </button>

            <div className={styles.pages}>
                {pageNumbers.map((item) => {
                    if (
                        item ===
                        "left-ellipsis"
                    ) {
                        return (
                            <span
                                key={item}
                                className={
                                    styles.ellipsis
                                }
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    if (
                        item ===
                        "right-ellipsis"
                    ) {
                        return (
                            <span
                                key={item}
                                className={
                                    styles.ellipsis
                                }
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive =
                        item ===
                        currentPage;

                    return (
                        <button
                            key={item}
                            type="button"
                            className={[
                                styles.pageButton,
                                isActive
                                    ? styles.pageButtonActive
                                    : ""
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            onClick={() =>
                                handlePageChange(
                                    item
                                )
                            }
                            aria-label={`Go to page ${item}`}
                            aria-current={
                                isActive
                                    ? "page"
                                    : undefined
                            }
                        >
                            {item}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                className={styles.navigationButton}
                onClick={handleNext}
                disabled={!hasNextPage}
                aria-label="Go to next page"
            >
                <span>Next</span>

                <FiChevronRight
                    aria-hidden="true"
                />
            </button>
        </nav>
    );
};

export default VehiclePagination;