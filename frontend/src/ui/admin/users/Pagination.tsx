import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (val: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
