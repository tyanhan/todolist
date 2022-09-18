import React from "react";

import { Container, Grid } from "@mui/material";

import CustomAppBar from "../molecules/CustomAppBar";
import ToDoList from "../molecules/ToDoList";

const TasksPage = () => {
	return (
		<>
			<CustomAppBar />
			<Container >
				<Grid container sx={{ mt: "6rem", alignItems: "center", justifyContent: "center", direction: "row" }}>
					<ToDoList />
				</Grid>
			</Container>
		</>
	);
};

export default TasksPage;