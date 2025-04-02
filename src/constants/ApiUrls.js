//const DRKB_WIKI_BASE_URL = "http://172.16.2.32:5065";
const DRKB_WIKI_BASE_URL = "https://localhost:7271";
const DRKB_AUTH_BASE_URL = "http://localhost:5064";
const DRKB_WIKI_EDUCATION_BASE_URL = "http://localhost:5264";

export const API_URLS = {
    COMMON_DOCUMENT: `${DRKB_WIKI_BASE_URL}/api/common-document`,
    SPECIFIC_DOCUMENT: `${DRKB_WIKI_BASE_URL}/api/common-document`,
    COUNTRY: `${DRKB_WIKI_BASE_URL}/api/country`,
    ENVIRONMENT: `${DRKB_WIKI_BASE_URL}/api/environment`,
    ENVIRONMENT_MODEL: `${DRKB_WIKI_BASE_URL}/api/environment-model`,
    ENVIRONMENT_TYPE: `${DRKB_WIKI_BASE_URL}/api/environment-type`,
    MANUFACTURER: `${DRKB_WIKI_BASE_URL}/api/manufacturer`,
    VIDEO: `${DRKB_WIKI_BASE_URL}/api/video`,

    AUTH: `${DRKB_AUTH_BASE_URL}/login`,
    DEPARTMENT: `${DRKB_AUTH_BASE_URL}/api/department`,

    TEST : `${DRKB_WIKI_EDUCATION_BASE_URL}/api/test`,
    COURSE : `${DRKB_WIKI_EDUCATION_BASE_URL}/api/course`
};