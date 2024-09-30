import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import ReminderListItem from "../components/ReminderListItem";
import ReminderForm from "../components/ReminderForm";
import ConfirmDelete from "../components/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { tokenCheck } from "../services/tokenCheck";
import { InfinitySpin } from "react-loader-spinner";
import Logout from "../components/Logout";

const Reminders = () => {
    // Load States
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    // Create Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventAt, setEventAt] = useState("");
    const [remindAt, setRemindAt] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    // Edit States
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState("");

    // Delete States
    const [deleteItem, setDeleteItem] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        tokenCheck().then((res) => {
            if (!res) {
                navigate("/");
            }

            loadReminders();
        });
    }, []);

    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);

    const loadReminders = async () => {
        setLoading(true);

        const token = await tokenCheck();

        if (!token) {
            navigate("/");
        }

        try {
            const response = await api.get("/reminders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.status === 200) {
                setList(response.data.data.reminders || []);
            }
        } catch (error) {
            toast.error(response.response.data.message, {
                position: "top-right",
            });
        }

        setLoading(false);
    };

    const clearForm = async () => {
        setTitle("");
        setDescription("");
        setEventAt("");
        setRemindAt("");
        setEdit(false);
        setEditId("");
    };

    const handleSaveForm = async () => {
        const data = {
            title,
            description,
            event_at: Math.floor(new Date(eventAt).getTime() / 1000),
            remind_at: Math.floor(new Date(remindAt).getTime() / 1000),
        };

        if (
            title.trim() === "" ||
            description.trim() === "" ||
            eventAt.trim() === "" ||
            remindAt.trim() === ""
        ) {
            toast.error("All fields are required!", {
                position: "top-right",
            });
            return;
        }

        setFormLoading(true);

        const token = await tokenCheck();

        if (!token) {
            navigate("/");
        }

        try {
            let response;

            if (edit && editId !== "") {
                response = await api.put(`/reminders/${editId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
            } else {
                response = await api.post("/reminders", data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
            }

            if (response && response.status === 200) {
                if (edit && editId !== "") {
                    const newValues = {
                        title: title,
                        description: description,
                        eventAt: eventAt,
                        remindAt: remindAt,
                    };

                    setList((currentList) =>
                        currentList.map((item) =>
                            item.id === editId
                                ? { ...item, ...newValues }
                                : item
                        )
                    );
                } else {
                    loadReminders();
                }
                document.getElementById("closeReminderModal").click();

                setTitle("");
                setDescription("");
                setEventAt("");
                setRemindAt("");
                setEdit(false);
                setEditId("");

                toast.success("Reminder successfully created!", {
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error(
                error.response.data.message || "Something went wrong!",
                {
                    position: "top-right",
                }
            );
        }

        setFormLoading(false);
    };

    const handleDelete = async () => {
        if (deleteItem === "") {
            return;
        }

        setDeleteLoading(true);

        const token = await tokenCheck();

        if (!token) {
            navigate("/");
        }

        try {
            const response = await api.delete(`/reminders/${deleteItem}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.status === 200) {
                loadReminders();
                document.getElementById("closeDeleteModal").click();

                setDeleteItem("");

                toast.success("Reminder successfully deleted!", {
                    position: "top-right",
                });
            }
        } catch (error) {
            toast.error("Something went wrong!", {
                position: "top-right",
            });
        }

        setDeleteLoading(false);
    };

    return (
        <>
            <ReminderForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                eventAt={eventAt}
                setEventAt={setEventAt}
                remindAt={remindAt}
                setRemindAt={setRemindAt}
                formLoading={formLoading}
                setFormLoading={setFormLoading}
                handleSaveForm={handleSaveForm}
                edit={edit}
                editId={editId}
            />
            <ConfirmDelete
                deleteItem={deleteItem}
                handleDelete={handleDelete}
            />
            <div className="h-100 main-layout">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-xl-8">
                            <div className="row g-0">
                                <div className="p-md-5 mx-md-4">
                                    <div className="text-center">
                                        <div className="mb-5">
                                            <Logo logoWidth={"75px"} />
                                            <h4 className="pt-3">
                                                Welcome{" "}
                                                <span className="text-warning">
                                                    {loading
                                                        ? "User"
                                                        : userData.name ||
                                                          "User"}
                                                </span>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4 justify-content-between align-items-center">
                                        <h3 className="flex-grow-1">
                                            Reminders
                                        </h3>
                                        <button
                                            className="btn btn-primary me-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#reminderForm"
                                            onClick={clearForm}
                                        >
                                            Create New Reminder
                                        </button>

                                        <Logout />
                                    </div>

                                    {loading ? (
                                        <div className="text-center">
                                            <InfinitySpin
                                                visible={true}
                                                width="250"
                                                color="#fba834"
                                                ariaLabel="infinity-spin-loading"
                                            />
                                        </div>
                                    ) : Object.keys(list).length > 0 ? (
                                        list.map((item) => (
                                            <ReminderListItem
                                                item={item}
                                                setEdit={setEdit}
                                                setEditId={setEditId}
                                                deleteItem={deleteItem}
                                                setDeleteItem={setDeleteItem}
                                                setTitle={setTitle}
                                                setDescription={setDescription}
                                                setEventAt={setEventAt}
                                                setRemindAt={setRemindAt}
                                                key={item.id}
                                            />
                                        ))
                                    ) : (
                                        "No Reminder Found!"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reminders;
