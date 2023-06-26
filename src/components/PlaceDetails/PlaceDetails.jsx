import React from "react";

//MUI components
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

//icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";

//css
import useStyles from "./styles";

const PlaceDetails = ({ place }) => {
    const classes = useStyles();
    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={
                    place.photo?.images.large.url ||
                    "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/9/f/b/p96998-166220853463134a16b48fa.jpg?w=400"
                }
                title={place.name}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                >
                    {place.name}
                </Typography>
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography variant="subtitle">Price</Typography>
                    <Typography
                        gutterBottom
                        variant="subtitle"
                    >
                        {place.price_level}
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Typography variant="subtitle">Ranking</Typography>
                    <Typography
                        gutterBottom
                        variant="subtitle"
                    >
                        {place.ranking}
                    </Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box
                        my={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <img
                            src={award.images?.small}
                            alt="award"
                        />
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                        >
                            {award?.display_name}
                        </Typography>
                    </Box>
                ))}

                {place?.cuisine?.map(({ name }) => (
                    <Chip
                        key={name}
                        size="small"
                        label={name}
                        className={classes.chip}
                    />
                ))}

                {place?.address && (
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="subtitle2"
                        className={classes.subtitle}
                    >
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}

                {place?.phone && (
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="subtitle2"
                        className={classes.spacing}
                    >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place?.web_url, "_blank")}
                    >
                        Trip Advisor
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place?.website, "_blank")}
                    >
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;
