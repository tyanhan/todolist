import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const CustomAppBar = () => {
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "sans-serif",
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
						}}
					>
						SaiTasker
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default CustomAppBar;
