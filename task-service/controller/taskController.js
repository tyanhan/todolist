import { addTaskSchema } from "../dto/addTaskDto.js";
import { deleteTaskSchema } from "../dto/deleteTaskDto.js";
import { updateTaskSchema } from "../dto/updateTaskDto.js";
import { addTaskService, getTasksService, deleteTaskService, updateTaskService } from "../service/taskService.js";

export const handleAddTask = (req, res) => {
	try {
		const { error, value } = addTaskSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { description, isChecked } = value;

		addTaskService(description, isChecked).then((err) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			console.debug(`Created task "${description}" successfully`);
			return res.status(200).json({
				message: `Created task "${description}" successfully`,
			});
		})
	} catch (err) {
		console.debug("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleGetTasks = (req, res) => {
	try {
		getTasksService().then((tasks) => {
			if (!tasks) {
				return res.status(400).json({ message: "Failed to retrieve tasks" });
			}
			console.debug("Retrieved tasks successfully");
			return res.status(200).json({
				message: "Retrieved tasks successfully",
				tasks: tasks,
			});
		})
	} catch (err) {
		console.debug("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleDeleteTask = (req, res) => {
	try {
		const { error, value } = deleteTaskSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { description } = value;

		deleteTaskService(description).then((err) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			console.debug(`Deleted task "${description}" successfully`);
			return res.status(200).json({
				message: `Deleted task "${description}" successfully`,
			});
		}).catch(err => {
			console.debug("Error: ", err);
			return res.status(500).json({ message: "An error occured, please try again later." });
		});
	} catch (err) {
		console.debug("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};

export const handleUpdateTask = (req, res) => {
	try {
		const { error, value } = updateTaskSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { oldDesc, oldIsChecked, newDesc, newIsChecked } = value;
		console.debug(oldDesc, oldIsChecked, newDesc, newIsChecked);

		updateTaskService(oldDesc, oldIsChecked, newDesc, newIsChecked).then((err) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			console.debug(`Updated task "{ ${oldDesc}, ${oldIsChecked} }" to "{ ${newDesc}, ${newIsChecked} }" successfully`);
			return res.status(200).json({
				message: "Updated task successfully",
			});
		});
	} catch (err) {
		console.debug("Error: ", err);
		return res.status(500).json({ message: "An error occured, please try again later." });
	}
};