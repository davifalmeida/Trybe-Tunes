import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/album';
import Search from './pages/search';
import Favorites from './pages/favorites';
import NotFound from './pages/notFound';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
