import "./styles.css";
import * as constants from "./constants";
import { useCallback, useEffect, useState } from "react";
import Photos from "./photos";
import Pagination from "./pagination";

export default function App() {
  const [photos, setAllPhotos] = useState([]);
  const [currentRecords, setCurrentRecord] = useState([]);
  const [recordPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const pageCount = Math.ceil(photos.length / recordPerPage);

  const fetchPhotos = () => {
    fetch(constants.ALL_PHOTOS)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        setAllPhotos(response);
      })
      .catch((err) => {
        console.log("No Photos found" + err);
      });
  };

  const fetchPerPage = () => {
    fetch(
      constants.ALL_PHOTOS +
        "?_start=" +
        indexOfFirstRecord +
        "&_limit=" +
        recordPerPage
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        setCurrentRecord(response);
      })
      .catch((err) => {
        console.log("No Photos found" + err);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    fetchPerPage();
  }, []);

  const searchPhotos = (searchTerm) => {
    if (searchTerm === "" || searchTerm.length < 3) {
      return;
    }
    const inputWords = searchTerm.match(/\w+|"[^"]+"/g);
    inputWords.push(searchTerm);
    return photos.filter((data) => {
      const filteredResult = JSON.stringify([
        data.id,
        data.title
      ]).toLowerCase();
      return inputWords.every((result) => filteredResult.includes(result));
    });
  };

  const filterTable = useCallback(({ target }) => {
    const searchTerm = target.value.toLowerCase();
    const searchResult = searchPhotos(searchTerm);
    if (searchResult !== undefined) {
      setCurrentRecord(searchResult);
      setAllPhotos(searchResult);
    }
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="container">
        <input
          type="text"
          className="input"
          placeholder="search..."
          onChange={filterTable}
        />
      </div>
      <Photos photos={currentRecords} />
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
