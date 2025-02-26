
/*export const apiRequest = async (url, options, isExpectingData = true) => {
    try {
        return await executeRequest(url, options, isExpectingData);
    } catch (error) {
        console.error(error);
        alert(error);
    }
}*/

export const apiRequest = async (url, options = {}, isExpectingData = true) => {
    try {
        const user = localStorage.getItem('user');
        const headers = { ...options.headers };

        if (user) {
            headers["Authorization"] = `Bearer ${user.token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers
        });

        //Для дополнительной логики если надо будет хз
        if (response.status === 401) {
            localStorage.removeItem("jwtToken");
            window.location.href = "/login";
            throw new Error("Unauthorized: Session expired");
        }

        if (response.status === 500) {
            return {
                success: false,
                status: response.status,
                errorMessage: await response.text()
            }
        }

        if (!response.ok) {
            return {
                success: false,
                status: response.status,
                errorMessage: await response.text()
            }
        }

        if (isExpectingData) {
            return {
                success: true,
                data: await response.json()
            }
        }
        else {
            return {
                success: true,
            }
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: "Произошла ошибка при выполнении запроса. Пожалуйста, повторите позже"
        }
    }

};

export const configureUrlParams = (params) => {
    return new URLSearchParams(params).toString();
};