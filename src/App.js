import "./styles.css";
import * as constants from "./constants";
import { useCallback, useEffect, useState } from "react";
import Photos from "./photos";
import TablePagination from "./pagination";
import useFetch from "./fetchHook";
import SearchBar from "./search";

export default function App() {
  const [recordPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const [fetchedPhotos] = useFetch(constants.ALL_PHOTOS);
  let [fetchedCurrentRecords] = useFetch(
    constants.ALL_PHOTOS +
      "?_start=" +
      indexOfFirstRecord +
      "&_limit=" +
      recordPerPage
  );
  const [photos, setPhotos] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const pageCount = photos ? Math.ceil(photos.length / recordPerPage) : 0;

  useEffect(() => {
    setPhotos(fetchedPhotos);
    setCurrentRecords(fetchedCurrentRecords);
  }, [fetchedPhotos, fetchedCurrentRecords]);

  const searchPhotos = useCallback(
    (searchTerm) => {
      if (searchTerm === "" || searchTerm.length < 3) {
        return;
      }
      const inputWords = searchTerm.match(/\w+|"[^"]+"/g);
      inputWords.push(searchTerm);
      return fetchedPhotos.filter((data) => {
        const filteredResult = JSON.stringify([
          data.id,
          data.title
        ]).toLowerCase();
        return inputWords.every((result) => filteredResult.includes(result));
      });
    },
    [fetchedPhotos]
  );

  const filterTable = useCallback(
    ({ target }) => {
      const searchTerm = target.value.toLowerCase();
      const searchResult = searchPhotos(searchTerm);
      if (searchResult !== undefined) {
        setCurrentRecords(searchResult);
        setPhotos(searchResult);
      } else {
        setPhotos(fetchedPhotos);
        setCurrentRecords(fetchedCurrentRecords);
      }
    },
    [searchPhotos, fetchedPhotos, fetchedCurrentRecords]
  );

  return (
    <main className="container">
      <div className="row mt-4">
        <h3>React Photos API with Pagination</h3>
      </div>
      <SearchBar filterTable={filterTable} />
      <Photos photos={currentRecords} />
      {pageCount && <TablePagination
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> }
    </main>
  );
}
