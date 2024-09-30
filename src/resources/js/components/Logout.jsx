import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { tokenCheck } from "../services/tokenCheck";
import { toast } from "react-toastify";

const Logout = () => {
    // Logout States
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLogoutLoading(true);
        const token = await tokenCheck();

        // Check token: If not signed in, navigate to Login
        if (!token) {
            navigate("/");
        }

        try {
            // Call API: Logout
            const response = await api.post(
                `/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // Update local storage
                localStorage.removeItem("user");
                localStorage.removeItem("refresh_token");

                // Navigate to Login page
                navigate("/");

                // Toast success
                toast.success("Successfully Logged Out!", {
                    position: "top-right",
                });
            }
        } catch (error) {
            // Toast Error
            toast.error("Something went wrong!", {
                position: "top-right",
            });
        }

        setLogoutLoading(false);
    };

    return (
        <button
            className="btn btn-danger"
            disabled={logoutLoading}
            onClick={handleLogout}
        >
            {logoutLoading ? "Loading..." : "Sign Out"}
        </button>
    );
};

export default Logout;
