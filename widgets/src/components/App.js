import './App.css';

import Accordion from './Accordion';
import Search from './Search';

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

export default () => {
    return (
        <div>
            <Search />
        </div>
    );
}