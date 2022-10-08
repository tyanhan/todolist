import { Box, CardHeader, CircularProgress, Divider, IconButton, List, ListItem, Paper, Grid } from "@mui/material";
import * as React from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import { URI_GET_WEATHER } from "../../configs";

const WeatherCard = () => {
    const [isWeatherLoading, setIsWeatherLoading] = React.useState(false);
	const [weather, setWeather] = React.useState([]);
    const [error, setError] = React.useState(null);

	const handleGetWeather = () => {
		setIsWeatherLoading(true);
		axios.get(URI_GET_WEATHER, { "timeout": 5000 })
		.then((res) => {
			setIsWeatherLoading(false);
			setWeather(res.data.weather);
			console.debug("Successfully retrieved weather");
		})
		.catch((err) => {
			setError("Error fetching weather, please try again later");
			setIsWeatherLoading(false);
			console.debug(err);
		})
	}

    React.useEffect(() => {
		handleGetWeather();
	}, []);

    return (
        <>
        <Paper elevation={4} sx={{ minWidth: 600 }}>
				<CardHeader sx={{ backgroundColor: "#3CB371" }}
                    action={
                        <IconButton aria-label="settings" onClick={handleGetWeather}>
                            <RefreshIcon />
                        </IconButton>
                }
					title="Weather forecast"
				/>
				{isWeatherLoading ? <CircularProgress sx={{ py: 2 }} /> :
					error != null ? <Box py={2}>{error}</Box> :
						<List sx={{ width: '100%', minWidth: 600, bgcolor: 'background.paper', pt: "0px", pb: "0px" }}>
							{weather?.map((w) => {
								let area = w.area;
								let forecast = w.forecast;

								return (
									<Box key={area}>
										<Divider />
										<ListItem
											disablePadding
										>
                                            <Grid container>
                                                <Grid item xs={6} sx={{minHeight: "40px"}}>
                                                    {area}
                                                </Grid>
                                            
                                                <Divider orientation="vertical" flexItem />
                                                <Grid item sx={{minHeight: "40px"}}>
                                                    {forecast}
                                                </Grid>
                                            </Grid>
									
										</ListItem>
										<Divider />
									</Box>
								)
							})}
						</List>}
			</Paper >
        </>
    )
}

export default WeatherCard;