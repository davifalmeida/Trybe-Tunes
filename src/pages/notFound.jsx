import React from 'react';
import Header from '../Components/header';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <h1>Page Not Found</h1>
      </div>
    );
  }
}

export default NotFound;
