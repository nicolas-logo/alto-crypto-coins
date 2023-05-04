import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import renderer  from 'react-test-renderer';
import NavBar from '../../components/navBar/navBar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('NavBar tests', () => {    
    
    it('should set correctly HTML', () => {
        const instance = renderer.create((<Router><NavBar /></Router>)).root;
        // eslint-disable-next-line testing-library/await-async-query, testing-library/no-node-access
        expect(instance.findAllByProps({ className: "link" }).length).toEqual(6);
    })
    
    it('should match the snapshot', () => {
        const tree = renderer.create((<Router><NavBar /></Router>)).toJSON();
        expect(tree).toMatchSnapshot();
    })

    
    
})