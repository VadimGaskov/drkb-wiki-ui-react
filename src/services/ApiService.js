
export const apiRequest = async (url, options) => {
    try {
        return await executeRequest(url, options);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

const executeRequest = async (url, options = {}) => {
    const user = localStorage.getItem('user');
    const headers = { ...options.headers };

    if (user) {
        headers["Authorization"] = `Bearer ${user.token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
        throw new Error("Unauthorized: Session expired");
    }

    if (response.status === 500) {
        throw new Error("Server Error");
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    return response.json();
};

export const configureUrlParams = (params) => {
    return new URLSearchParams(params).toString();
};