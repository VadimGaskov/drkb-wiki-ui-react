const documentationPath = "documentation";
const maintenanceLogBookPath = "maintenance-logbook";
export const ABSOLUTE_ROUTINGS = {
    home : "/home",
    login: "/login",
    listEnvironment: {
        root: "/list-environment",
        environmentModel: (id = ":id") => `/list-environment/environment-model/${id}`,
        documentation: (id = ":id") => `/list-environment/environment-model/${id}/${documentationPath}`,
        maintenanceLogbook: (id = ":id") => `/list-environment/environment-model/${id}/${maintenanceLogBookPath}`,
        /*test: ()*/
    }
}

export const ROUTINGS = {
    HOME : "/home",
    LOGIN: "/login",
    LIST_ENVIRONMENT: "/environments",
    LIST_ENVIRONMENT_MODEL: (departmnetId = ":departmentId") => `${ROUTINGS.LIST_ENVIRONMENT}/${departmnetId}`,
    ENVIRONMENT_MODEL: (id = ":id") => `environment/${id}`,
    DOCUMENTATION: "documentation",
    MAINTENANCE_LOGBOOK: "maintenance-logbook",
    JOURNALS: "journal",
    SHORT_INSTRUCTION: "short-instruction",
    ENVIRONMENTS: "environments",
    LIST_COURSES: "/courses",
    NOT_ALLOWED: "/not-allowed",
    LIST_DEPARTMENTS: "/departments",
    LIST_ARTICLE: (courseId = ":courseId") => `${ROUTINGS.LIST_COURSES}/${courseId}`,
    ARTICLE: (articleId = ":articleId") => `article/${articleId}`,
    TEST: (testId = ":testId") => `test/${testId}`
}