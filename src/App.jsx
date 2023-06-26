import React, { useEffect, useState } from "react";

import { CssBaseline, Grid } from "@material-ui/core";

//components
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

//apis
import { getPlacesDetails } from "./api";

const App = () => {
    //states
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [corners, setCorners] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        console.log(coordinates, corners);
        getPlacesDetails(corners.sw, corners.ne).then((data) => {
            console.log(data);
            setPlaces(data);
        });
    }, [coordinates, corners]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid
                container
                spacing={3}
                style={{ width: "100%" }}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                >
                    <List />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={8}
                >
                    <Map
                        setCoordinates={setCoordinates}
                        coordinates={coordinates}
                        setCorners={setCorners}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
