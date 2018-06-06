import { getButtons } from './common';

export const setCards = (cards, num) => {
    const buttons = getButtons(cards.length, num);
    return {
        type: 'SET_CARDS',
        cards,
        buttons,
        num,
        active: 1
    };
};

export const refreshActive = num => {
    return {
        type: 'CARDS_REFRESHACTIVE_BUTTON',
        num
    };
};
