export const  buildListQueryParams = (listParams, paramName) => {
    const params = new URLSearchParams();
    listParams.forEach(id => {
        params.append('departmentIds', id);
    });
    return params.toString();
}