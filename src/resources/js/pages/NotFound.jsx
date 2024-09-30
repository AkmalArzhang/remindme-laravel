import React from "react";
import Logo from "../components/Logo";

const NotFound = () => {
    return (
        <div className="h-100 main-layout">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-8">
                        <div className="card rounded-3 text-black border-0">
                            <div className="row g-0">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <div className="mb-5">
                                                <Logo logoWidth={"100px"} />
                                            </div>
                                            <h1 className="mt-1 mb-5 pb-1 text-warning">
                                                404!
                                            </h1>
                                            <h3>Page Not Found!</h3>
                                        </div>
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

export default NotFound;
