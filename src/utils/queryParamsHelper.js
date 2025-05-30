export const  buildListQueryParams = (listParams, paramName) => {
    const params = new URLSearchParams();
    if (Array.isArray(listParams)) {
        listParams.forEach(id => {
            params.append('departmentIds', id);
        });
    }
    else {
        params.append('departmentIds', listParams);
    }
    return params.toString();
}