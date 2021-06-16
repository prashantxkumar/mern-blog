import { Link } from "react-router-dom";

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <div className="container">
                <div className="navbar__row">
                    <div className="navbar__left">
                        <Link exact to="/">
                            <img className="logo" src="/images/logo.png" alt="img" />
                        </Link>
                    </div>
                    <div className="navbar__right">
                        <li>
                            <Link exact to="/login">Login</Link>
                        </li>
                        <li>
                            <Link exact to="/register">Register</Link>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;