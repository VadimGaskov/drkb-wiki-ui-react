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

    LIST_DEPARTMENTS: "/departments",
        LIST_ENVIRONMENT_MODEL: (departmnetId = ":departmentId") => `environments/${departmnetId}`,
            ENVIRONMENT_MODEL: (id = ":id") => `environment/${id}`,
                DOCUMENTATION: "documentation",
                MAINTENANCE_LOGBOOK: "maintenance-logbook",
                JOURNALS: "journal",
                SHORT_INSTRUCTION: "short-instruction",
    //Образование
    LIST_COURSES: "/courses",
        LIST_ARTICLE: (courseId = ":courseId") => `${courseId}`,
            ARTICLE: (articleId = ":articleId") => `article/${articleId}`,
                TEST: (testId = ":testId") => `test/${testId}`,
    //Прочее
    LOGIN: "/login",
    NOT_ALLOWED: "/not-allowed",


    SHORT_INSTRUCTION_SECOND: "short-instruction/:environmentId",
}