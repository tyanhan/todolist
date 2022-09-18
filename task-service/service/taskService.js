import { addTask, isTaskExists, getTasks, deleteTask, updateTask } from "../repository/taskRepository.js";

export const addTaskService = async (description, isChecked) => {
	if (await isTaskExists(description)) {
		console.debug("Task already exists");
		return "Task already exists";
	}
	addTask(description, isChecked);
};

export const getTasksService = async () => {
	let tasks = await getTasks();
	tasks = tasks.map((task) => { return { "description": task.description, "isChecked": task.isChecked }; });
	if (!tasks) {
		console.debug("Task list is empty");
	}
	return tasks;
};

export const deleteTaskService = async (description) => {
	if (!await isTaskExists(description)) {
		console.debug("Task does not exist");
		return "Task does not exist";
	}
	deleteTask(description);
};

export const updateTaskService = async (oldDesc, oldIsChecked, newDesc, newIsChecked) => {
	if (!await isTaskExists(oldDesc)) {
		console.debug("Task does not exist");
		return "Task does not exist";
	}

	if (oldDesc !== newDesc && await isTaskExists(newDesc)) {
		console.debug("Task already exists");
		return "Task already exists";
	}

	updateTask(oldDesc, oldIsChecked, newDesc, newIsChecked);
};