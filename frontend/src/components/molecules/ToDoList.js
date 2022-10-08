import { Box, Button, CardHeader, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as React from "react";
import axios from "axios";
import { URL_ADD_TASK_SVC, URL_DELETE_TASK_SVC, URL_GET_TASKS_SVC, URL_UPDATE_TASK_SVC } from "../../configs";

const ToDoList = () => {
	const [tasks, setTasks] = React.useState([]);
	const [description, setDescription] = React.useState("");
	const [descriptionError, setDesciptionError] = React.useState(null);
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const [editDescription, setEditDescription] = React.useState("");
	const [editDescriptionError, setEditDesciptionError] = React.useState(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [editOldDescription, setEditOldDescription] = React.useState("");
	const [editOldIsChecked, setEditOldIsChecked] = React.useState(false);

	const handleGetTasks = () => {
		setIsLoading(true);
		axios.get(URL_GET_TASKS_SVC, { "timeout": 5000 })
			.then((res) => {
				setIsLoading(false);
				setTasks(res.data.tasks);
				console.debug("Successfully retrieved tasks");
			})
			.catch((err) => {
				setError("Error fetching tasks, please try again later");
				setIsLoading(false);
				console.debug(err);
			})
	}

	const handleAddTask = async (description) => {
		const res = await axios.post(URL_ADD_TASK_SVC, { description, isChecked: false })
			.catch((err) => {
				setDesciptionError(err.response.data.message);
				console.debug(err);
			})
		if (res && res.status === 201) {
			console.debug("Successfully added task");
			let newTasks = [...tasks, { description, isChecked: false }];
			setTasks(newTasks);
			closeDialog();
		}
	}

	const handleDeleteTask = async (description) => {
		const res = await axios.delete(URL_DELETE_TASK_SVC, { data: { description } })
			.catch((err) => {
				console.debug(err);
			})
		if (res && res.status === 200) {
			console.debug("Successfully deleted task");
			setTasks(tasks.filter(task => task.description !== description));
		}
	}

	const handleUpdateTask = async (oldDesc, oldIsChecked, newDesc, newIsChecked) => {
		const res = await axios.put(URL_UPDATE_TASK_SVC, { oldDesc, oldIsChecked, newDesc, newIsChecked })
			.catch((err) => {
				setEditDesciptionError(err.response.data.message);
				console.debug(err);
			})
		if (res && res.status === 200) {
			console.debug("Successfully updated task");
			let index = tasks.findIndex(task => task.description === oldDesc);
			let newTasks = [...tasks];
			newTasks[index].description = newDesc;
			newTasks[index].isChecked = newIsChecked;
			setTasks(newTasks);
			closeEditDialog();
		}
	}

	const handleToggle = (description) => () => {
		const currentIndex = tasks.map(task => task.description).indexOf(description);

		if (currentIndex !== -1) {
			let taskToUpdate = tasks[currentIndex];
			handleUpdateTask(description, taskToUpdate.isChecked, description, !taskToUpdate.isChecked);
		}
	}

	const handleChange = (event) => {
		setDescription(event.target.value);
	}

	const handleEditChange = (event) => {
		setEditDescription(event.target.value);
	}

	const openDialog = () => {
		setIsDialogOpen(true);
	}

	const closeDialog = () => {
		setIsDialogOpen(false);
		setDescription("");
		setDesciptionError("");
	}

	const openEditDialog = (description, isChecked) => {
		setIsEditDialogOpen(true);
		setEditOldDescription(description);
		setEditOldIsChecked(isChecked);
	}

	const closeEditDialog = () => {
		setIsEditDialogOpen(false);
		setEditDescription("");
		setEditDesciptionError("");
	}

	React.useEffect(() => {
		handleGetTasks();
	}, []);

	return (
		<>
			<Paper elevation={4} sx={{ minWidth: 600 }}>
				<CardHeader sx={{ backgroundColor: "#FFDE00" }}
					action={
						<IconButton aria-label="settings" onClick={openDialog}>
							<AddIcon />
						</IconButton>
					}
					title="My Tasks"
				/>
				{isLoading ? <CircularProgress sx={{ py: 2 }} /> :
					error != null ? <Box py={2}>{error}</Box> :
						<List sx={{ width: '100%', minWidth: 600, bgcolor: 'background.paper', pt: "0px", pb: "0px" }}>
							{tasks?.map((task) => {
								let description = task.description;
								let isChecked = task.isChecked;

								const labelId = `checkbox-list-label-${description}`;

								return (
									<Box key={description}>
										<Divider />
										<ListItem
											secondaryAction={
												<>
													<IconButton edge="end" onClick={() => openEditDialog(description, isChecked)}>
														<EditIcon />
													</IconButton>
													<IconButton edge="end" onClick={() => handleDeleteTask(description)}>
														<DeleteIcon />
													</IconButton>
												</>
											}
											disablePadding
										>
											<ListItemButton onClick={handleToggle(description)} >
												<ListItemIcon>
													<Checkbox
														edge="start"
														checked={isChecked}
														tabIndex={-1}
														disableRipple
														inputProps={{ 'aria-labelledby': labelId }}
														color="secondary"
													/>
												</ListItemIcon>
												<ListItemText id={labelId} primary={description} />
											</ListItemButton>
										</ListItem>
										<Divider />
									</Box>
								)
							})}

						</List>}
			</Paper >
			<Dialog open={isDialogOpen} onClose={closeDialog} fullWidth>
				<DialogTitle>Add task</DialogTitle>
				<DialogContent>
					<TextField autoFocus onChange={handleChange} value={description} label="Task description" variant="standard" error={descriptionError !== null} helperText={descriptionError} fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleAddTask(description)}>Add</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={isEditDialogOpen} onClose={closeEditDialog} fullWidth>
				<DialogTitle>Edit task</DialogTitle>
				<DialogContent>
					<TextField autoFocus onChange={handleEditChange} value={editDescription} label="New task description" variant="standard" error={editDescriptionError !== null} helperText={editDescriptionError} fullWidth />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleUpdateTask(editOldDescription, editOldIsChecked, editDescription, editOldIsChecked)}>Edit</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ToDoList;
