import '../../styles/styles.css';
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from '../../context/AuthContext';

const Header = () => {
    const { user, loggedOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        loggedOut(user);
        navigate("/register");
    }

    return(
        <header className="navbar navbar-expand-lg mb-3 mt-0 pt-0">
            <div className="container-fluid navbar_style">
                <Link to="/" className="nav-item header_text" style={{ textDecoration: 'none' }}>
                    EVENT MANAGEMENT SYSTEM
                </Link>

                {user && (
                    <button onClick={logout} className="btn btn-danger ms-auto">
                        Log Out
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;