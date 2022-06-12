import './App.css';

import { useState } from 'react';

import Accordion from './Accordion';
import ArticleSearch from './ArticleSearch';
import Translate from './Translate';
import Route from './Route';
import NavBar from './NavBar';
import Link from './Link';
import ImageSearch from './ImageSearch';
import YoutubeSearch from './YoutubeSearch';

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
            <NavBar>
                <Link href="/" className="item" activeClassName="active item">
                    About
                </Link>
                <Link href="/images" className="item" activeClassName="active item">
                    Images
                </Link>
                <Link href="/videos" className="item" activeClassName="active item">
                    Videos
                </Link>
                <Link href="/articles" className="item" activeClassName="active item">
                    Articles
                </Link>
                <Link href="/translate" className="item" activeClassName="active item">
                    Translate
                </Link>
            </NavBar>
            <Route path="/">
                <Accordion items={items} />
            </Route>
            <Route path="/images">
                <ImageSearch />
            </Route>
            <Route path="/articles">
                <ArticleSearch />
            </Route>
            <Route path="/videos">
                <YoutubeSearch />
            </Route>
            <Route path="/translate">
                <Translate />
            </Route>
        </div>
    );
}