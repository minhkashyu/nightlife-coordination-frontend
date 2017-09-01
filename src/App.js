import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
    BrowserRouter as Router,
    Route,
    Switch
    } from 'react-router-dom';

import Home from './components/home.jsx';
import NotFound from './components/notFound.jsx';
import LoginSuccess from './components/loginSuccess.jsx';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login-success/:media/:jwt" component={LoginSuccess} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </CookiesProvider>
        );
    }
}

export default App;
