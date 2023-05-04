import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from '@testing-library/react';
import renderer  from 'react-test-renderer';
import CoinCard from '../../components/coinCard/coinCard';
import coinCardMock from '../mocks/coinCardMock';

afterEach(() => {
    cleanup();
})

describe('Coin Card tests', () => {
    it('should render coinCard component', () => {
        render(<CoinCard {...coinCardMock} />);
        const coinCardElement = screen.getByTestId('coin-card');
        expect(coinCardElement).toHaveTextContent('coin mock name');
        expect(coinCardElement).toHaveTextContent('coin symbol');
        expect(coinCardElement).toContainHTML('coin symbol');
        expect(coinCardElement).toContainHTML('https://test.com');
    })
    
    it('should match the snapshot', () => {
        const tree = renderer.create((<CoinCard {...coinCardMock} />)).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should set correctly HTML', () => {
        const instance = renderer.create((<CoinCard {...coinCardMock} />)).root;
        // eslint-disable-next-line testing-library/await-async-query, testing-library/no-node-access
        expect(instance.findByProps({ name: "name" }).children).toEqual([coinCardMock.name]);
    })
    
})