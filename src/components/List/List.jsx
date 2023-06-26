import React, { useState } from "react";

//packages
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";

//components
import PlaceDetails from "../PlaceDetails/PlaceDetails";
//css
import useStyles from "./styles";

const List = () => {
    const [type, setType] = useState("restuarents");
    const [rating, setRating] = useState("");
    const classes = useStyles();

    const places = [{ name: "place 1" }, { name: "place 2" }, { name: "place 3" }];
    return (
        <div className={classes.container}>
            <Typography variant="h4">Reastuarents, Hotels & Attraction around you</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={""}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value="restuarents">Restuarents</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select
                    value={""}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid
                container
                spacing={3}
                className={classes.list}
            >
                {places?.map((place, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}
                    >
                        <PlaceDetails place={place} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default List;
