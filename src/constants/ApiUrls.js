
//const DRKB_WIKI_BASE_URL = "http://localhost:5065";
const DRKB_WIKI_BASE_URL = "http://172.16.2.32:5065";
//http://172.16.2.32:9090
//const DRKB_AUTH_BASE_URL = "http://localhost:5064";
const DRKB_AUTH_BASE_URL = "http://172.16.2.32:5001";

//const DRKB_WIKI_EDUCATION_BASE_URL = "http://localhost:5264";
//http://172.16.2.32:6060
const DRKB_WIKI_EDUCATION_BASE_URL = "http://172.16.2.32:5003";

//const DRKB_WIKI_FILE_SAVER_BASE_URL = "http://localhost:5159";
//http://172.16.2.32:6060
const DRKB_WIKI_FILE_SAVER_BASE_URL = "http://172.16.2.32:5004";
export const API_URLS = {
    //DRKB-WIKI
    COMMON_DOCUMENT: `${DRKB_WIKI_BASE_URL}/api/common-document`,
    SPECIFIC_DOCUMENT: `${DRKB_WIKI_BASE_URL}/api/common-document`,
    COUNTRY: `${DRKB_WIKI_BASE_URL}/api/country`,
    ENVIRONMENT: `${DRKB_WIKI_BASE_URL}/api/environment`,
    ENVIRONMENT_MODEL: `${DRKB_WIKI_BASE_URL}/api/environment-model`,
    ENVIRONMENT_TYPE: `${DRKB_WIKI_BASE_URL}/api/environment-type`,
    MANUFACTURER: `${DRKB_WIKI_BASE_URL}/api/manufacturer`,
    VIDEO: `${DRKB_WIKI_BASE_URL}/api/video`,

    //AUTH
    AUTH: `${DRKB_AUTH_BASE_URL}/login`,
    DEPARTMENT: `${DRKB_AUTH_BASE_URL}/api/department`,
    RIGHTS: `${DRKB_AUTH_BASE_URL}/api/Rights`,
    POSITIONS: `${DRKB_AUTH_BASE_URL}/api/Position`,
    USER: `${DRKB_AUTH_BASE_URL}/api/User`,
    STATUSES: `${DRKB_AUTH_BASE_URL}/api/User`,

    //DRKB-WIKI-EDUCATION
    TEST : `${DRKB_WIKI_EDUCATION_BASE_URL}/api/test`,
    COURSE : `${DRKB_WIKI_EDUCATION_BASE_URL}/api/course`,
    ARTICLE: `${DRKB_WIKI_EDUCATION_BASE_URL}/api/course`,
    //DRKB-WIKI-FILE/SAVER
    VIDEO_SAVER: `${DRKB_WIKI_FILE_SAVER_BASE_URL}/api/video`,
    FILE_SAVER: `${DRKB_WIKI_FILE_SAVER_BASE_URL}/api/file`
};