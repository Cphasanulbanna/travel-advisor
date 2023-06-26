import React from "react";

//packages
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

//icons
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

//css
import useStyles from "./styles";

const Map = ({ coordinates, setCoordinates, setCorners }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery("(min-width: 600px)");

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
                // onChildClick={""}
            ></GoogleMapReact>
        </div>
    );
};

export default Map;
