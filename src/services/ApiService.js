
export const apiRequest = async (url, options, isExpectingData = true) => {
    try {
        return await executeRequest(url, options, isExpectingData);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

const executeRequest = async (url, options = {}, isExpectingData) => {
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
        throw new Error("Ошибка сервера");
    }

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Request failed with status ${response.status}: ${errorText}`);
        return false;
    }

    if (isExpectingData) {
        return await response.json();
    } else {
        return true;
    }
};

export const configureUrlParams = (params) => {
    return new URLSearchParams(params).toString();
};