import React from "react";

interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   pageSize,
                                                   totalCount,
                                                   onPageChange,
                                               }) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePreviousClick = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i}>
                    <a
                        href="#"
                        aria-current={currentPage === i ? "page" : undefined}
                        onClick={() => onPageChange(i)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === i
                                ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <nav
            className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
            aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
              {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, totalCount)}
            </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
              {totalCount}
            </span>
          </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button
                        onClick={handlePreviousClick}
                        className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {/* Render Page Numbers */}
                {renderPageNumbers()}
                <li>
                    <button
                        onClick={handleNextClick}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;

