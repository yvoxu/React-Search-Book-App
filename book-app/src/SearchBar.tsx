import React, { useState } from 'react';
import { IUserInput } from './Interface';
import { TextField, Button } from '@material-ui/core';

interface ISearchBarProps {
  SetUserInput: (a: IUserInput) => void;
}

function SearchBar(props: ISearchBarProps) {

  const [SearchQuery, setSearchQuery] = useState<string | null>("");

  const handleSearchQueryChange = (s: string | null) => {
    setSearchQuery(s);
  }

  const handleSubmit = () => {

    if (SearchQuery ?.length !== 0 && SearchQuery !== null && SearchQuery !== "") {
      let UserInput: IUserInput = {
        SearchQuery: SearchQuery,
      }
      props.SetUserInput(UserInput);
    } else {
      console.log("handleSubmit error")
    }
  }

  return (
    <div className="SearchBarContainer">
      <form>
        <TextField
          className="input"
          id="outlined-required"
          label="Search"
          variant="outlined"
          value={SearchQuery}
          onChange={e => handleSearchQueryChange(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>Search</Button>
      </form>

    </div>
  )
}


export default SearchBar