import SongCard from "./SongCard";
import { Grid, Box, Toolbar } from "@mui/material";

const SongsContainer = (props) => {
    const { data, token } = props;
    console.log(data);

    return (
        <>
            <Toolbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30, mb: 10 }}>
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems="stretch"
                >
                    {data.map((album, index) => {
                        const { images, artists, id } = album;
                        const imageSrc = images[0]?.url;
                        let { name } = album;
                        name =
                            name.length > 15
                                ? name.substring(0, 15) + "..."
                                : name;

                        return (
                            <SongCard
                                image={imageSrc}
                                title={name}
                                artist_names={artists}
                                key={index}
                                id={id}
                                token={token}
                            />
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
};

export default SongsContainer;
