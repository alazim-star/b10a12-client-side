

import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../Hooks/useAuth';



const PrivateRoute= ({children}) => {
    const {user,loading}=UseAuth()
const location =useLocation()

if (loading) {
    return <progress className="progress w-56"></progress>
}

    if (user) {
        return children
        
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;