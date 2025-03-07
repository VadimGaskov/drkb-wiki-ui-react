const baseUrl = "http://172.16.2.32:5065";
const authBaseUrl = "http://localhost:5064";
export const API_URLS = {
    COMMON_DOCUMENT: `${baseUrl}/api/common-document`,
    SPECIFIC_DOCUMENT: `${baseUrl}/api/common-document`,
    COUNTRY: `${baseUrl}/api/country`,
    ENVIRONMENT: `${baseUrl}/api/environment`,
    ENVIRONMENT_MODEL: `${baseUrl}/api/environment-model`,
    ENVIRONMENT_TYPE: `${baseUrl}/api/environment-type`,
    MANUFACTURER: `${baseUrl}/api/manufacturer`,
    VIDEO: `${baseUrl}/api/video`,

    AUTH: `${authBaseUrl}/login`,
    DEPARTMENT: `${authBaseUrl}/api/department`
};