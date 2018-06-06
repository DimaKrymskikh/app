import { getButtons } from '../common';

export const clearedCitiesWeather = () => ({type: 'CLEARED_CITIES'});

export const initCitiesWeather = (cities, num) => {
    const buttons = getButtons(cities.length, num);
    return {
        type: 'INIT_CITIES', 
        cities: cities.map( item => {
            item.repeatFetch = false;
            return item;
        }), 
        buttons, 
        num, 
        active: 1
    };
};

export const addCityWeather = city => ({ type: 'ADD_CITY', city });

export const deleteCityWeather = city => ({ type: 'DELETE_CITY', city });

export const sortCitiesWeather = par => ({ type: 'SORT_CITIES', par });

export const refreshActive = n => ({ type: 'CITIES_REFRESHACTIVE_BUTTON', n });

export const repeatFetchTrue = name => ({type: 'SET_REAPEATFETCH_TRUE', name});

export const repeatFetchFalse = name => ({type: 'SET_REAPEATFETCH_FALSE', name});

export const filterCitiesWeather = filters => ({type: 'FILTER_CITIES', filters});
