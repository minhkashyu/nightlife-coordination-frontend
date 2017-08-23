import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
    BrowserRouter as Router,
    Route,
    Switch
    } from 'react-router-dom';

import Home from './components/pages/home.jsx';
import NotFound from './components/pages/notFound.jsx';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </CookiesProvider>
        );
    }
}

export default App;
