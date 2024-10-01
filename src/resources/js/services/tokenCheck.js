import { refreshToken } from "./refreshToken";

// Check Token: Return the access_token if refresh_token is valid
export const tokenCheck = async () => {
    let token = localStorage.getItem("refresh_token");
    let userData = localStorage.getItem("user");

    if (!token || !userData) return false;

    token = JSON.parse(token);

    const response = await refreshToken(token);

    if (response.status === 200) {
        localStorage.setItem(
            "refresh_token",
            JSON.stringify(response.data.data.refresh_token)
        );

        return response.data.data.access_token;
    }

    return false;
};
