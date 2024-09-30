import React from "react";

const ConfirmDelete = ({ handleDelete }) => {
    return (
        <div
            className="modal fade"
            id="confirmDeleteModal"
            tabIndex="-1"
            aria-labelledby="confirmDeleteLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id="confirmDeleteLabel"
                        >
                            Confirm
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="closeDeleteModal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this reminder?
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleDelete}
                        >
                            Yes, Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
