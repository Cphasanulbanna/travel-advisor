import React from "react";

//packages
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

//icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

//css
import useStyles from "./styles";
import Marker from "google-map-react";
import { MarkerF } from "@react-google-maps/api";

const Map = ({ coordinates, setCoordinates, setCorners, places }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery("(min-width: 600px)");

    console.log(places, "places");

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_APIKEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                // options={""}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setCorners({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={""}
            >
                {places?.map((place, index) => (
                    <div
                        style={{ width: "100px", height: "100px" }}
                        className={classes?.markerContainer}
                        lat={Number(place?.latitude)}
                        lng={Number(place?.longitude)}
                        key={index}
                        position={{
                            lat: Number(place?.latitude),
                            lng: Number(place?.longitude),
                        }}
                    >
                        {/* {isDesktop ? (
                            <LocationOnOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                        ) : ( */}
                        <Paper
                            elevation={3}
                            className={classes.paper}
                        >
                            <Typography
                                className={classes?.typography}
                                variant="subtitle2"
                                gutterBottom
                            >
                                {place.name}
                            </Typography>
                            <img
                                className={classes?.pointer}
                                src={
                                    place.photo?.images.large.url ||
                                    "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/f/b/p96998-166220853463134a16b48fa.jpg?w=400"
                                }
                                alt="place"
                            />
                            <Rating
                                size="small"
                                value={Number(Number(place?.rating))}
                                readOnly
                            />
                        </Paper>
                        {/* )} */}
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
