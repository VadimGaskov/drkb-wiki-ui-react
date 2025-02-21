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

    }
}

export const ROUTINGS = {
    HOME : "/home",
    LOGIN: "/login",
    LIST_ENVIRONMENT: "/list-environment",
    ENVIRONMENT_MODEL: (id = ":id") => `environment-model/${id}`,
    DOCUMENTATION: "documentation",
    MAINTENANCE_LOGBOOK: "maintenance-logbook",
    JOURNALS: "journal",
    SHORT_INSTRUCTION: "short-instruction",
    ENVIRONMENTS: "environments",
    LIST_COURSES: "/list-courses"
}