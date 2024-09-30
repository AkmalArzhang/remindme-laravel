import React from "react";
import getDateTime from "../utils/getDateTime";

const ReminderForm = ({
    title,
    setTitle,
    description,
    setDescription,
    eventAt,
    setEventAt,
    remindAt,
    setRemindAt,
    formLoading,
    handleSaveForm,
    edit,
    editId,
}) => {
    return (
        <div
            className="modal fade"
            id="reminderForm"
            tabIndex="-1"
            aria-labelledby="reminderFormLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="reminderFormLabel">
                            {edit && editId
                                ? "Edit Reminder"
                                : "Create a Reminder"}
                        </h1>
                        <button
                            type="button"
                            id="closeReminderModal"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="title"
                                className="form-control"
                                placeholder="Reminder Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label className="form-label" htmlFor="title">
                                Title <span style={{ color: "red" }}>*</span>
                            </label>
                        </div>
                        <div className="form-outline mb-4">
                            <textarea
                                name="description"
                                className="form-control"
                                id="description"
                                placeholder="Description for your reminder"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <label className="form-label" htmlFor="description">
                                Description{" "}
                                <span style={{ color: "red" }}>*</span>
                            </label>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="datetime-local"
                                id="event"
                                className="form-control"
                                min={getDateTime()}
                                value={eventAt}
                                onChange={(e) => setEventAt(e.target.value)}
                            />
                            <label className="form-label" htmlFor="event">
                                Event Date & Time{" "}
                                <span style={{ color: "red" }}>*</span>
                            </label>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="datetime-local"
                                id="remind"
                                className="form-control"
                                min={getDateTime()}
                                value={remindAt}
                                onChange={(e) => setRemindAt(e.target.value)}
                            />
                            <label className="form-label" htmlFor="remind">
                                Reminder Date & Time{" "}
                                <span style={{ color: "red" }}>*</span>
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveForm}
                            className="btn btn-primary"
                            disabled={formLoading}
                        >
                            {formLoading ? "Loading" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderForm;
