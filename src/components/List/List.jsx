import React, { createRef, useEffect, useState } from "react";

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

const List = ({ places, childClicked, isLoading, type, rating, setType, setRating }) => {
    const [elementRefs, setElementRefs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        setElementRefs((refs) =>
            Array(places?.length)
                .fill()
                .map((_, index) => refs[index] || createRef())
        );
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">Reastuarents, Hotels & Attraction around you</Typography>
            {isLoading ? (
                <div className={classes.isLoading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
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
                                ref={elementRefs[index]}
                            >
                                <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === index}
                                    refProp={elementRefs[index]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default List;
