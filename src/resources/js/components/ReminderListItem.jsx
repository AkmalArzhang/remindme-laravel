import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import getDateTime from "../utils/getDateTime";

const ReminderListItem = ({
    item,
    setDeleteItem,
    setEdit,
    setEditId,
    setTitle,
    setDescription,
    setEventAt,
    setRemindAt,
}) => {
    const handleEdit = () => {
        setEdit(true);
        setEditId(item.id);
        setTitle(item.title);
        setDescription(item.description);
        setEventAt(getDateTime(item.event_at));
        setRemindAt(getDateTime(item.remind_at));
    };

    return (
        <div className="card text-dark bg-light mb-3">
            <div className="card-body text-center">
                <h5 className="card-title">{item.title || ""}</h5>
                <div className="mb-3">
                    <p className="fs-6 text-primary mb-0">
                        <i className="icon bi-calendar"></i> Event @{" "}
                        {new Date(item.event_at * 1000).toLocaleString()}
                    </p>
                    <p className="fs-6 text-warning">
                        <i className="icon bi-bell"></i> Reminder @{" "}
                        {new Date(item.remind_at * 1000).toLocaleString()}
                    </p>
                </div>

                <p className="card-text">{item.description || ""}</p>

                <div className="pt-3 mt-3 border-top d-flex justify-content-center">
                    <button
                        className="btn btn-warning me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#reminderForm"
                        onClick={handleEdit}
                    >
                        <i className="icon bi-pencil"></i> Edit
                    </button>
                    <button
                        className="btn btn-danger me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmDeleteModal"
                        onClick={() => setDeleteItem(item.id)}
                    >
                        <i className="icon bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderListItem;
