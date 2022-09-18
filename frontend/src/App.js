import './App.css';

import { Box, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { globalTheme } from "./globalTheme";
import HomePage from './components/pages/HomePage';
import TasksPage from './components/pages/TasksPage';

const App = () => {

	return (
		<div className="App">
			<ThemeProvider theme={globalTheme} >
				<Box display={"flex"} flexDirection={"column"}>
					<Router>
						<Routes>
							<Route exact path="/" element={<HomePage />} />
							<Route path="/tasks" element={<TasksPage />} />
						</Routes>
					</Router>
				</Box>
			</ThemeProvider>
		</div>
	);
};

export default App;
