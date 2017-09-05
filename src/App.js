import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
    BrowserRouter as Router,
    Route,
    Switch
    } from 'react-router-dom';

import SiteMenu from './components/template/siteMenu.jsx';
import SiteFooter from './components/template/siteFooter.jsx';

import Home from './components/home.jsx';
import NotFound from './components/notFound.jsx';
import SigninSuccess from './components/signinSuccess.jsx';
import Signout from './components/signout.jsx';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <div className="App">
                        <SiteMenu />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login-success/:media/:jwt" component={SigninSuccess} />
                            <Route path="/logout" component={Signout} />
                            <Route component={NotFound} />
                        </Switch>
                        <SiteFooter />
                    </div>
                </Router>
            </CookiesProvider>
        );
    }
}

export default App;
