export const activeMenu = (state = {name: ''}, action) => {
    if(action.type === 'SET_ACTIVE_PAGE') {
        return {name: action.name};
    }
    return state;
};

export const activeVerticalMenu = (state = {name: ''}, action) => {
    if(action.type === 'SET_ACTIVE_SECTION') {
        return {name: action.name};
    }
    return state;
};


