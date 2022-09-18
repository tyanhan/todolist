import cors from "cors";
import express from "express";

import { handleAddTask, handleDeleteTask, handleGetTasks, handleUpdateTask } from "./controller/taskController.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const router = express.Router();

app.use("/api/task", router).all((_, res) => {
	res.setHeader("content-type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
});

router.post("/addTask", handleAddTask);
router.get("/getTasks", handleGetTasks);
router.delete("/deleteTask", handleDeleteTask);
router.put("/updateTask", handleUpdateTask);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("task-service is listening on port 5000"));
