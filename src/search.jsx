const SearchBar = (props) => {
  const { filterTable } = props;

  return (
    <div className="container">
      <input
        type="text"
        className="input"
        placeholder="search..."
        onChange={filterTable}
      />
    </div>
  );
};

export default SearchBar;
