import Link from './Link';

const NavBar = ({ children }) => {
    return (
        <div className="ui secondary pointing menu">
            {children}
        </div>
    );
};

export default NavBar;