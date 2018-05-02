import { combineReducers } from 'redux';

import listCities from './list-cities';
import listMonths from './list-months';
import listEvents from './list-events';

export default combineReducers({
	listCities,
        listMonths,
	listEvents
});
