import { useState } from "react";
import searchFulbito from "../firebase/searchFulbito";

export function useSearchFulbito({ setFilteredData }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      setFilteredData(null);
      searchFulbito(text, (searchData) => {
        setFilteredData(searchData);
      });
    }
  };
  return { handleSearch, searchText };
}
