import './App.css';

import { useState } from 'react';

import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';

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

    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <Dropdown
                options={options}
                selection={selected}
                onSelect={(option) => setSelected(option)}
            />
            {/*<Search />*/}
        </div>
    );
}