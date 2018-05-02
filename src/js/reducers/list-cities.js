import {growthUp} from '../Weather/help';

export default function listCities(state = [], action) {
    if(action.type === 'INIT') {
        return action.arr;
    }
    if(action.type === 'ADD') {
        return [
            action.city,
            ...state
        ];
    }
    if(action.type === 'DELETE') {
        return state.filter( item => {
            return item.name !== action.city.name 
        });
    }
    if(action.type === 'SORT') {
        return [...state.sort(growthUp(action.par))]
    }
    return state;
}
