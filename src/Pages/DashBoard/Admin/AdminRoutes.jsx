import React from 'react';
// Ensure correct casing

import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';


const AdminRoutes = ({ children }) => {
    const { user, loading } = UseAuth(); // Destructure user and loading
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    // Show a loading spinner while fetching data
    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    // Allow access if the user is authenticated and an admin
    if (user && isAdmin) {
        return children;
    }

    // Redirect to the home page if not authenticated or not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoutes;
