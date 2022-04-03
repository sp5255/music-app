import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Stack, Box } from "@mui/material";
import { Paper } from "@mui/material";

const SongCard = (props) => {
    const { image, title, artist_names, id, token } = props;
    const ALBUM_BASE_URL = "https://api.spotify.com/v1/albums/";

    const getSong = async () => {
        console.log("clicked");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`${ALBUM_BASE_URL}${id}`, config);
        const res = await response.json();
        console.log("getting album info ", res);
    };
    return (
        <Grid item xs={5} sm={4} md={3} lg={2} onClick={getSong}>
            <Card>
                <CardActionArea>
                    <Paper elevation={3} sx={{ maxWidth: 200 }}>
                        <Stack spacing={2} sx={{ padding: 2, pt: 1 }}>
                            <Card sx={{ maxWidth: "100%", height: 150, mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={image}
                                    alt="green iguana"
                                />
                            </Card>

                            <Typography
                                variant="subtitle2"
                                sx={{ mt: "0 !important" }}
                            >
                                {title}
                            </Typography>
                            <Stack direction="row" sx={{ mt: "0 !important" }}>
                                {artist_names.map((obj, ind) => {
                                    if (ind < 1)
                                        return (
                                            <Typography
                                                variant="caption"
                                                key={ind}
                                            >
                                                {" "}
                                                {obj.name.substring(0, 20)}{" "}
                                            </Typography>
                                        );
                                })}
                            </Stack>
                        </Stack>
                    </Paper>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default SongCard;
