import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Search;
