import mongoose from "mongoose";

import "dotenv/config.js";
import TaskModel from "./taskModel.js";

// eslint-disable-next-line no-undef
let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const addTask = async (description, isChecked) => {
	try {
		console.debug(`Adding task {description: ${description}, isChecked: ${isChecked}}`);
		const newTask = new TaskModel({ description, isChecked });
		newTask.save();
		console.debug("Successfully added task to the database");
	} catch (err) {
		console.error("Could not create new task", err);
		throw err;
	}
};

export const isTaskExists = async (description) => {
	try {
		console.debug(`Checking if task "${description}" exists`);
		return await db.collection("taskmodels").findOne({ description });
	} catch (err) {
		console.error("Error checking if task exists", err);
		throw err;
	}
};

export const getTasks = async () => {
	try {
		console.debug("Retrieving tasks from the database");
		let tasks = await db.collection("taskmodels").find().toArray();
		console.debug(tasks);
		return tasks;
	} catch (err) {
		console.error("Could not retrieve tasks", err);
		throw err;
	}
};

export const deleteTask = async (description) => {
	try {
		console.debug(`Deleting task {description: ${description}}`);
		await db.collection("taskmodels").deleteOne({ "description": description });
		console.debug("Successfully deleted task in the database");
	} catch (err) {
		console.error("Could not delete task", err);
		throw err;
	}
};

export const updateTask = async (oldDesc, oldIsChecked, newDesc, newIsChecked) => {
	try {
		console.debug(`Updating task "{ ${oldDesc}, ${oldIsChecked} }"`);
		await db.collection("taskmodels").updateOne({ "description": oldDesc, "isChecked": oldIsChecked }, { $set: { "description": newDesc, "isChecked": newIsChecked } });
		console.debug("Successfully updated task in the database");
	} catch (err) {
		console.error("Could not update task", err);
		throw err;
	}
};