import React from "react";

function Search({searchText, onChangeSearch}) {

  function handleChange(event) {
    onChangeSearch(event.target.value)
  }
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
