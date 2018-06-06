import { combineReducers } from 'redux';

import { listCities, filterCities } from './list-cities';
import { listMonths } from './events-calendar';
import { activeMenu, activeVerticalMenu } from './active-menu';
import { listCards } from './list-cards';

export default combineReducers({
	listCities,
        filterCities,
        listMonths,
        activeMenu,
        activeVerticalMenu,
        listCards
});
