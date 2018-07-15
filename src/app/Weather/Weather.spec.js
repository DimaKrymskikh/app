import React from 'react';
import { shallow } from 'enzyme';

import Weather from './Weather';
import { initCities } from '../actions/weather/get-cities';

import { createStore } from 'redux';
import reducer from '../reducers';
const store = createStore(reducer);

const setup = () => {
    const actions = {
        onDeleteCityWeather: jest.fn()
    };
    const component = shallow(
        <Weather store={store} />
    );
//    console.log(<Weather store={store} />)
    return {
        actions: actions,
        IconCross: component.find('.IconCross')
    };
};

describe('Weather component', () => {
    beforeAll( async () => {
        const initStateCities = await initCities();
        console.log(initStateCities)
    });
    it('', () => {
        const {IconCross, actions} = setup();
        console.log(IconCross)
        if(IconCross.length) {
            IconCross.at(0).simulate('click');
        }
        expect(actions.onDeleteCityWeather).toBeCalled();
    });
});
