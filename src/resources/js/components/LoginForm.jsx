import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { tokenCheck } from "../services/tokenCheck";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // If signed in => Navigate to reminders
    useEffect(() => {
        tokenCheck().then((res) => {
            if (res) {
                navigate("/reminders");
            }
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const credentials = {
            email,
            password,
        };

        // Validate form and credentials
        if (Object.values(credentials).some((value) => value.trim() === "")) {
            toast.error("Email and password is required!", {
                position: "top-right",
            });
            return;
        }

        setLoading(true);

        try {
            // Call session API
            const response = await api.post("/session", credentials);

            if (response.status === 200) {
                // Set local storage
                localStorage.setItem(
                    "refresh_token",
                    JSON.stringify(response.data.data.refresh_token)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.user)
                );

                // Toast success
                toast.success("Login Successful!", {
                    position: "top-right",
                });

                // Navigate to reminders
                navigate("/reminders");
            }
        } catch (error) {
            // Toast Error
            toast.error(
                error.response.data.message || "Something went wrong!",
                {
                    position: "top-right",
                }
            );
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleLogin}>
            <p>Please login to your account</p>

            <div className="form-outline mb-4">
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="form-label" htmlFor="email">
                    Email <span style={{ color: "red" }}>*</span>
                </label>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="password">
                    Password <span style={{ color: "red" }}>*</span>
                </label>
            </div>

            <div className="text-center pt-1 mb-5 pb-1">
                <button
                    className="btn btn-primary btn-block btn-lg fa-lg mb-3"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Log in"}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
