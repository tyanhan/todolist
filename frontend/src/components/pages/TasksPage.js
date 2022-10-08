import React from "react";

import { Container, Grid } from "@mui/material";

import CustomAppBar from "../molecules/CustomAppBar";
import ToDoList from "../molecules/ToDoList";
import WeatherCard from "../molecules/WeatherCard";

const TasksPage = () => {
	return (
		<>
			<CustomAppBar />
			<Container >
				<Grid container spacing={8} sx={{ mt: "6rem", alignItems: "center", justifyContent: "center", direction: "column"}} wrap="nowrap">
					<Grid item>
						<ToDoList />
					</Grid>
					<Grid item>
						<WeatherCard />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default TasksPage;