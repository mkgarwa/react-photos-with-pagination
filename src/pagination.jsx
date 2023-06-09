
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const TablePagination = (props) => {
  const { pageCount, currentPage, setCurrentPage } = props;
  const [paginationNumbers, setPaginationNumbers] = useState([]);

  const nextPage = () => {
    if (currentPage !== pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showPaginationNumbers = () => {
    let maxButtons = [];
    let showMax = 20;
    let endPage = props.pageCount;
    let startPage = currentPage;

    if (pageCount > showMax) {
      if (currentPage !== pageCount && (currentPage + 1) !== pageCount) {
        endPage = Math.min(currentPage + showMax - 1, pageCount);
      }
      if (endPage - startPage < showMax) {
        startPage = Math.max(endPage - showMax, 1);
      }
    }
    for (var i = startPage; i <= endPage; i++) {
      maxButtons.push(i);
    }
    setPaginationNumbers(maxButtons);
  };

  useEffect(() => {
    showPaginationNumbers();
  }, [currentPage]);

  return (
    <Pagination className="d-flex justify-content-center mb-5 mt-4">
      <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
      {paginationNumbers.map((page) => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={nextPage} disabled={currentPage === pageCount} />
    </Pagination>
  );
};

export default TablePagination;
