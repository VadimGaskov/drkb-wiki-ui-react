
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
        throw new Error("Server Error");
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    // Check if there's a body and if it's JSON
    const contentLength = response.headers.get('Content-Length');
    const contentType = response.headers.get('Content-Type');

    // If no content (e.g., Content-Length: 0 or no body), treat as success
    /*if (response.status === 200 && (!contentLength || contentLength === '0')) {
        return true; // Success with no content
    }

    // If there's a body, ensure it's JSON and parse it
    if (contentType && contentType.includes('application/json')) {
        try {
            const s = await response.json();
            console.log("ЖЕЙСОН КОТОРЫЙ ПРИХОДИТ ");
            console.log(s);
            return await response.json();

        } catch (error) {
            throw new Error("Failed to parse response as JSON: " + error.message);
        }
    }*/
    if (isExpectingData) {
        return await response.json();
    } else {
        return true;
    }

};

export const configureUrlParams = (params) => {
    return new URLSearchParams(params).toString();
};