export const ROLES = {
    ADMIN: "Admin",
    COORDINATOR: "Coordinator",
    STUDENT: "Student",
    TEACHER: "Teacher",
    LAB_ASSISTANT: "LabAssistant",
  };
  
  export const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    USERS: "/admin/users",
    ADD_ROLE: "/admin/add-role",
    UPDATE_USER: "/admin/update-user",
    DELETE_USER: "/admin/delete-user",
    ASSIGN_LAB: "/coordinator/assign-lab",
    ADD_ROUTINE: "/coordinator/add-routine",
    MY_LABS: "/lab-assistant/my-labs",
    SCHEDULE: "/student/schedule",
    ASSIGNED_CLASSES: "/teacher/assigned-classes",
  };
  
  export const NOTIFICATION_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
  };