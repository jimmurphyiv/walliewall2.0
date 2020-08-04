import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Profile from './Components/Profile/Profile';
import Search from './Components/Search/Search';
import Contact from './Components/Contact/Contact';

export default(
    <Switch>
        <Route component={Home} exact path='/'  />
        <Route path='/auth' component={Auth} />
        <Route path= '/Dash' component={Dash} />
        <Route path= '/profile' component={Profile} />
        <Route path= '/search' component={Search} />
        <Route path= '/Contact' component={Contact} />
    </Switch>
);