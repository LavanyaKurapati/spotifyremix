import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import YourMusic from './components/YourMusic'
import SpecificPlaylist from './components/SpecificPlaylist'
import SpecificCategory from './components/SpecificCategory'
import SpecificAlbum from './components/SpecificAlbum'
import Playlists from './components/Playlists'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/playlists/:id" component={SpecificPlaylist} />
      <ProtectedRoute path="/genre/:id" component={SpecificCategory} />
      <ProtectedRoute path="/album/:id" component={SpecificAlbum} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/your-music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={Playlists} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
