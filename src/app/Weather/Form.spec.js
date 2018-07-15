import React from 'react'
import { shallow } from 'enzyme'
import Form from './Form'

const setup = () => {
    const actions ={
        addCity: jest.fn()
    };
    const component = shallow(
        <Form {...actions} />
    );
    console.log(component.children())
    return {
        actions: actions,
        button: component.find('button')
    };
};

describe('Weather: Form component', () => {
    it('Вызов addCity при клике', () => {
        const {actions, button} = setup();
        button.simulate('click');
        expect(actions.addCity).toBeCalled();
    });
});
