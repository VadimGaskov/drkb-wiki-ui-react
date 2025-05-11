import {useEffect, useState} from "react";

const useFetch = (callback, deps = []) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (callback === null || callback === undefined) return;
        const fetchData = async () => {
            const result = await callback();
            if (result.success) {
                setData(result.data);
            }
            else {
                setError(result.errorMessage);
            }
            setIsLoading(false);
        }
        const areDependenciesReady = deps.every(dep => dep !== null && dep !== undefined);
        if(areDependenciesReady) {
            fetchData();
        }
    }, [...deps]);

    return [data, isLoading, error]
}

export default useFetch;