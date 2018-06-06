import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu/Menu';
import Footer from './Footer';

import Main from './Main/Main';
import Calendar from './Calendar/Calendar';
import Weather from './Weather/Weather';
import Tasks from './Tasks/Tasks';

const App = () => {

    return (
        <div className="App">
            <Menu />
            <div>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/weather" component={Weather} />
                    <Route path="/tasks" component={Tasks} />
                    <Route component={Main} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
};

export default App;
