const Pagination = (props) => {
  const { pageCount, currentPage, setCurrentPage } = props;
  const pageNumbers = [...Array(pageCount + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== pageCount) {
      setCurrentPage(pageCount + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(pageCount - 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a href="#" onClick={prevPage}>
            Previous
          </a>
        </li>
        {pageNumbers.map((page) => (
          <li key={page}>
            <a href="#" onClick={() => setCurrentPage(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
