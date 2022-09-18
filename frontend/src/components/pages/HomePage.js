import React from "react";

import { Container, Typography } from "@mui/material";

import CustomAppBar from "../molecules/CustomAppBar";

const HomePage = () => {
	return (
		<>
			<CustomAppBar />
			<Container>
				<Typography sx={{ mx: "auto", my: "5rem" }} variant="h2" align="center">
					Welcome to SaiTasker!
				</Typography>
				<Typography variant="h4" align="center" href="/tasks" component="a">
					Click here to get started!
				</Typography>
			</Container>
		</>
	);
};

export default HomePage;