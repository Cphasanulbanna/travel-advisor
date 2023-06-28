import React, { useEffect, useState } from "react";

//MUI components
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
    const [corners, setCorners] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setLoading] = useState(false);

    //fetching current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        getPlacesDetails(corners?.sw, corners?.ne).then((data) => {
            setPlaces(data);
            setLoading(false);
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
                    <List
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                    />
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
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
