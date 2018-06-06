import {month, monthUp, monthDown, getMonth} from '../actions/calendar/data';
import {notes} from '../actions/calendar/list-notes';

const initState = {
    month: month,
    str: ''
};

export const listMonths = (state = initState, action) => {
    if(action.type === 'MONTH_UP') {
        return {
            ...state,
            month: monthUp()
        };
    }
    if(action.type === 'MONTH_DOWN') {
        return {
            ...state,
            month: monthDown()
        };
    }
    if(action.type === 'NOTES_CHANGE') {
        return {
            ...state,
            month: getMonth()
        };
    }
    if(action.type === 'REFRESH_STR_INPUT') {
        return {
            ...state,
            str: action.str
        };
    }
    return state;
};

