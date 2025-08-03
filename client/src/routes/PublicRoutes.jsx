import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if (loading) {
        return <div>Loading content ...</div>;
    }

    if (user) {
        return <Navigate to="/events" replace />;
    }

    return children;

};

export default PublicRoute;