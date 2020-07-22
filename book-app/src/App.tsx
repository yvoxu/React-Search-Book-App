import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { IUserInput } from "./Interface";
import BookList from "./BookList";

function App() {
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "",
  });

  function SetUserInput(a: IUserInput) {
    setUserInput(a);
  }

  return (
    <div className="App">
      <Header />
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)} />
      { UserInput.SearchQuery &&
        <BookList SearchQuery={UserInput.SearchQuery} />}
    </div>
  );
}

export default App;
