import './App.css';

import { useState } from 'react';

import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

const items = [
    {
        id: 1,
        title: 'What is React?',
        content: 'React is a front-end JavaScript framework.'
    },
    {
        id: 2,
        title: 'Why use React?',
        content: 'React is a favorite JS library among engineers.'
    },
    {
        id: 3,
        title: 'How do you use React?',
        content: 'You use react by creating components.'
    }
];

const options = [
    {
        label: 'The Color Red',
        value: 'red'
    },
    {
        label: 'The Color Green',
        value: 'green'
    },
    {
        label: 'A Shade of Blue',
        value: 'blue'
    }
];

export default () => {

    return (
        <div>
            <Header />
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/list">
                <Search />
            </Route>
            <Route path="/dropdown">
                <Dropdown options={options}>Select Color</Dropdown>
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    );
}