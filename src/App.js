import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Album from './Pages/Album';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';

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
