import React from 'react'
import { shallow } from 'enzyme'
import Weather from './Weather'

import { createStore } from 'redux';
import reducer from '../reducers';
const store = createStore(reducer);

const setup = () => {
    const actions = {
        onAddCity: jest.fn(),
        onDeleteCity: jest.fn(),
        onInitCities: jest.fn()
    };
    const component = shallow(
        <Weather store={store} />
    );
    return {
        actions: actions,
        xSVG: component.find('.x-svg')
    };
};

describe('Weather component', () => {
    it('', () => {
        const {xSVG, actions} = setup();
        console.log(xSVG);
        if(xSVG.length) {
            xSVG.at(0).simulate('click');
        }
        expect(actions.onDeleteCity).not.toBeCalled();
    });
});
