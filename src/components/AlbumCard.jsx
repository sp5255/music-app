import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid, Stack } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../contants";
import { useNavigate } from "react-router-dom";

const AlbumCard = (props) => {
    const { title, artist, id } = props;
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const image_base_url = `${BASE_URL}/v2.2/albums/${id}/images`;
            const resp = await fetch(`${image_base_url}?apikey=${API_KEY}`);
            const { images } = await resp.json();
            setImageUrl(images[1].url);
        })();
    }, [id]);

    return (
        <Grid
            item
            xs={5}
            sm={4}
            md={3}
            lg={2}
            onClick={() => navigate(`/albums/${id}`)}
        >
            <Card sx={{  maxWidth: 200 }}>
                <CardActionArea>
                    <Paper elevation={3} sx={{ maxWidth: 200 }}>
                        <Stack spacing={2} sx={{ padding: 2, pt: 1 }}>
                            <Card sx={{ maxWidth: "100%", height: 150, mb: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={imageUrl}
                                    alt="green iguana"
                                />
                            </Card>

                            <Typography
                                variant="subtitle2"
                                sx={{ mt: "0 !important" }}
                            >
                                {title.substring(0, 15)}
                            </Typography>
                            <Stack direction="row" sx={{ mt: "0 !important" }}>
                                <Typography variant="caption">
                                    {artist.substring(0, 15)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Paper>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default AlbumCard;
