import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Administration = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authenticated')|| false);

    if(isAuthenticated) {
        return (
            <div>
                <p>Welcome to your Dashboard</p>
            </div>
        );
    }
    return <Navigate replace to="/" />;
};
export default Administration;