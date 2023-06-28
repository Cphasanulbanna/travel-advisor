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
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [corners, setCorners] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    //fetching current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        const filteredData = places?.filter((place) => place?.rating > rating);
        setFilteredPlaces(filteredData);
    }, [rating]);

    useEffect(() => {
        setLoading(true);
        getPlacesDetails(type, corners?.sw, corners?.ne).then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating("");
            setLoading(false);
        });
    }, [type, corners]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
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
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
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
                        places={filteredPlaces?.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default App;
