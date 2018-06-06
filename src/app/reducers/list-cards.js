
const initState = {
    cards: [],
    buttons: [],
    num: 0,
    active: 1
};

export const listCards = (state = initState, action) => {
    if(action.type === 'SET_CARDS') {
        return {
            cards: action.cards,
            buttons: action.buttons,
            num: action.num,
            active: action.active
        };
    }
    
    if(action.type === 'CARDS_REFRESHACTIVE_BUTTON') {
        return {
            ...state,
            active: action.num
        }
    }
    return state;
};
