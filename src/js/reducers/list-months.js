import {month, monthUp, monthDown, getMonth} from '../Calendar/date';

const initState = month;

export default function listMonths(state = initState, action) {
    if(action.type === 'PLUS') {
        return monthUp();
    }
    if(action.type === 'MINUS') {
        return monthDown();
    }
    if(action.type === 'NOTES_CHANGE') {
        return getMonth();
    }
    return state;
}


