import { getButtons, growthUp } from '../actions/common';

const initState = { 
    isLoad: false,      // Состояние загрузки 
    cities: [],         // Массив городов
    buttons: [],        // Кнопки пагинации
    num: 0,             // Число городов на странице
    active: 1           // Активная страница
};

export const listCities = (state = initState, action) => {
    if(action.type === 'CLEARED_CITIES') {
        return initState;
    }
    
    if(action.type === 'INIT_CITIES') {
        return {
            isLoad: true,
            cities: action.cities,
            buttons: action.buttons,
            num: action.num,
            active: action.active
        };
    }
    
    if(action.type === 'ADD_CITY') {
        const ob = {...action.city};
        ob.repeatFetch = false;
        // Удаляем город, если он уже есть в store
        const arr = state.cities.filter( item => {
            return item.name !== ob.name;
        });
        const buttons = getButtons(arr.length + 1, state.num);
        return {
            ...state,
            cities: [ob, ...arr],
            buttons
        };
    }
    
    if(action.type === 'DELETE_CITY') {
        const arr = state.cities.filter( item => {
            return item.name !== action.city.name; 
        });
        const buttons = getButtons(arr.length, state.num);
        return {
            ...state,
            cities: arr,
            buttons
        };
    }
    
    if(action.type === 'SORT_CITIES') {
        return {
            ...state,
            cities: [...state.cities.sort(growthUp(action.par))]
        };
    }
    
    if(action.type === 'CITIES_REFRESHACTIVE_BUTTON') {
        return {
            ...state,
            active: action.n
        };
    }
    
    if(action.type === 'SET_REAPEATFETCH_TRUE') {
        return {
            ...state,
            cities: state.cities.map( item => {
                if(item.name === action.name) {
                    item.repeatFetch = true;
                }
                return item;
            })
        };
    }
    if(action.type === 'SET_REAPEATFETCH_FALSE') {
        return {
            ...state,
            cities: state.cities.map( item => {
                if(item.name === action.city) {
                    item.repeatFetch = false;
                }
                return item;
            })
        };
    }
    return state;
};


    
export const defaultMinTemp = -100;
export const defaultMaxTemp = 100;
export const defaultMinSpeed = 0;
export const defaultMaxSpeed = 50;

export const filterCities = ( state = {
    minTemp: defaultMinTemp,
    maxTemp: defaultMaxTemp,
    minSpeed: defaultMinSpeed,
    maxSpeed: defaultMaxSpeed
}, action) => {
    if(action.type === 'FILTER_CITIES') {
        return {
            minTemp: action.filters.minTemp,
            maxTemp: action.filters.maxTemp,
            minSpeed: action.filters.minSpeed,
            maxSpeed: action.filters.maxSpeed
        };
    }
    return state;
};

