import React from 'react';
import {shallow} from 'enzyme';
import Login from "../Component/User/Login"

describe('Login Component', () => {
    it('should render login form without throwing an error', () => {
        expect(shallow(<Login />).find('form.loginForm').exists()).toBe(true)
    })

    it('renders a email input text', () => {
        expect(shallow(<Login />).find('#email').length).toEqual(1)
    })
    it('renders a password input text', () => {
        expect(shallow(<Login />).find('#password').length).toEqual(1)
    })
       
})