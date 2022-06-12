import { useState, useEffect } from 'react';

const POPSTATE_EVENT = 'popstate';

const Route = ({ path, children }) => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener(POPSTATE_EVENT, onLocationChange);

        return () => {
            window.removeEventListener(POPSTATE_EVENT, onLocationChange);
        };
    }, []);

    return currentPath === path
        ? children
        : null;
}

export default Route;