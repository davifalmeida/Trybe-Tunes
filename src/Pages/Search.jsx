import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
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
