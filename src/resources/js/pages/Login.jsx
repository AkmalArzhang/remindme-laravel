import React from "react";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className="h-100 main-layout">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-8">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-7">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <div className="mb-5">
                                                <Logo logoWidth={"100px"} />
                                            </div>
                                            <h4 className="mt-1 mb-5 pb-1">
                                                Welcome to RemindMe
                                            </h4>
                                        </div>

                                        <LoginForm />
                                    </div>
                                </div>
                                <div className="col-lg-5 d-flex align-items-center custom-gradient">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h3 className="mb-1">
                                            We help you remember
                                        </h3>
                                        <h5 className="mb-4">
                                            & never miss a thing.
                                        </h5>
                                        <p className="small mb-0">
                                            RemindMe is designed to help you
                                            manage your daily reminders
                                            effectively. With a user-friendly
                                            interface, you can easily set up and
                                            customize reminders for all your
                                            important tasks, events, and
                                            deadlines. Whether it’s a meeting, a
                                            doctor’s appointment, or a simple
                                            grocery run, "RemindMe" ensures you
                                            never miss a thing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
