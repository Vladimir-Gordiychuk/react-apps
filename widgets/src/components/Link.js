import { useState, useEffect } from 'react';

const Link = ({ href, children, className, activeClassName }) => {

    activeClassName = activeClassName || className;

    const [isActive, setIsActive] = useState();

    useEffect(() => {
        const checkActiveState = () => {
            setIsActive(window.location.pathname === href);
        };

        window.addEventListener('popstate', checkActiveState);

        return () => {
            window.removeEventListener('popstate', checkActiveState);
        };

    }, [])

    const onClick = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        event.preventDefault();

        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a href={href}
            className={isActive ? activeClassName : className}
            onClick={onClick}>
            {children}
        </a>
    );

};

export default Link;