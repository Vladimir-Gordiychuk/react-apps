import './App.css';

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
        title: 'What is this site about?',
        content: (<div>
            This site is sort of sandbox where it's Author can experiment,
            practice and play around with web technologies: React.js, HTML/CSS, etc.
        </div>)
    },
    {
        id: 2,
        title: 'Who is the author?',
        content: (<div>
            It's me, <a href="https://vladimir-gordiychuk.netlify.app">Vladimir Gordiychuk</a>.
        </div>)
    },
    {
        id: 3,
        title: 'How can I make use of this site?',
        content: (<div>
            <p>
                Well, there isn't much use of this site for anybody else except its Author. 
                You definitely can explore and test this application. 
                There are certain limits for amount of API calls this application can make, 
                but it is unlikely that casual browsing will trigger them.
            </p>
            <p>
                Please, use the navigation bar at the top of the page to see different tabs 
                this application provides.
            </p>
        </div>)
    },
    {
        id: 4,
        title: 'Privacy Policy',
        content: (<div>
            <p>This is a plain React app - everything gets executed on Your machine.
            Nothing is stored on the server side except React app bundle.
            That means that no personal data is stored on the server, where this application is deployed.</p>
            <p>There only a few peaces of data that get sent to external APIs (servers):
            this is the data you provide in the input fields and search bars.
            I cannot guarantee that this data is secure out there, so, please,
            do not provide any sensitive information in the input fields and/or search bars.</p>
        </div>)
    },
    {
        id: 5,
        title: 'What is the list of technologies/modules being used in this application?',
        content: (<div>
            This is a very basic ('vanilla') React application.
            Only <b>React.js</b> and <b>axios</b> being used at the moment.
        </div>)
    },
    {
        id: 6,
        title: 'What is the list of used APIs?',
        content: (<ul>
            <li>LibreTranslate</li>
            <li>Unsplash</li>
            <li>Wikipedia</li>
            <li>Youtube</li>
        </ul>)
    },
    {
        id: 7,
        title: 'What is React?',
        content: (<div>
            React is a front-end JavaScript framework.
        </div>)
    },
    {
        id: 8,
        title: 'Why use React?',
        content: (<div>
            React lets you implement certain technics that make your GUI-elements (React components)
            much more reusable while keeping source code clean and transparent.
        </div>)
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