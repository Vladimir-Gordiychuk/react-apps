const Link = ({ href, children, className }) => {

    const onClick = (event) => {
        event.preventDefault();

        window.history.pushState({}, '', href);

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a href={href} className={className} onClick={onClick}>
            {children}
        </a>
    );

};

export default Link;