import AlbumCard from "./AlbumCard";
import { Grid, Box, Toolbar } from "@mui/material";

const AlbumsContainer = (props) => {
    const { albums } = props;
    console.log(albums);

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
                    {albums.map((album, index) => { 
                        const {name, artistName, id} = album
                        return (
                            <AlbumCard                                
                                title={name}
                                artist={artistName}
                                key={index}
                                id={id}                                
                            />
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
};

export default AlbumsContainer;
