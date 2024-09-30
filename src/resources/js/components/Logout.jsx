import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { tokenCheck } from "../services/tokenCheck";
import { toast } from "react-toastify";

const Logout = () => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLogoutLoading(true);
        const token = await tokenCheck();

        if (!token) {
            navigate("/");
        }

        try {
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
                localStorage.removeItem("user");
                localStorage.removeItem("refresh_token");
                navigate("/");

                toast.success("Successfully Logged Out!", {
                    position: "top-right",
                });
            }
        } catch (error) {
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
