import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import reducer from './reducers';
import App from './App';
import Calendar from './Calendar';
import Weather from './Weather';
import {initCities} from './Weather/help';

import '../less/styles.less';
import '../less/event-form.less';
import '../less/App.less';
import '../less/Calendar.less';
import '../less/Weather.less';

( async () => {
    const store = createStore(reducer);

    const initStateCities = await initCities();

    store.dispatch({
        type: 'INIT',
        arr: initStateCities
    });

    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/weather" component={Weather} />
                </div>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
})();
