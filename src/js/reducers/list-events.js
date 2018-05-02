import {notes} from '../Calendar/list-notes';

const initialState = notes.getList('');

export default function listEvents(state = initialState, action) {
    if(action.type === 'EVENTS_FILTER') {
        return notes.getList(action.str);
    }
    if(action.type === 'NOTES_CHANGE') {
        return notes.getList('');
    }
return state;
}

