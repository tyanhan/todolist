// eslint-disable-next-line no-undef
const URI_TASK_SVC = process.env.URI_TASK_SVC || "http://localhost:8079";

const PREFIX_TASK_SVC = "/api/task";

const GET_TASKS_SVC = "/getTasks";
const ADD_TASK_SVC = "/addTask";
const DELETE_TASK_SVC = "/deleteTask";
const UPDATE_TASK_SVC = "/updateTask";

export const URL_TASK_SVC = URI_TASK_SVC + PREFIX_TASK_SVC;
export const URL_GET_TASKS_SVC = URI_TASK_SVC + PREFIX_TASK_SVC + GET_TASKS_SVC;
export const URL_ADD_TASK_SVC = URI_TASK_SVC + PREFIX_TASK_SVC + ADD_TASK_SVC;
export const URL_DELETE_TASK_SVC = URI_TASK_SVC + PREFIX_TASK_SVC + DELETE_TASK_SVC;
export const URL_UPDATE_TASK_SVC = URI_TASK_SVC + PREFIX_TASK_SVC + UPDATE_TASK_SVC;