import api from "./api";

export const refreshToken = async (token) => {
    try {
        const response = await api.put("/session", "", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};
