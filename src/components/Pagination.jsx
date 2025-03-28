import React from 'react';
import PropTypes from 'prop-types';

function Pagination({
  totalBooks,
  booksPerPage,
  setCurrentPage,
  currentPage,
}) {
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          style={{
            margin: '0 5px',
            cursor: 'pointer',
            fontWeight: currentPage === page ? 'bold' : 'normal',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setCurrentPage(page);
            }
          }}
          tabIndex={0}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  totalBooks: PropTypes.number.isRequired,
  booksPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
