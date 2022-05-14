import AlbumCard from "./AlbumCard";
import { Grid, Box, Toolbar } from "@mui/material";

const AlbumsContainer = (props) => {
  const { albums, search } = props;
  console.log(albums);

  return (
    <>
      {!search && <Toolbar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: !search ? 3 : "initial",
          ml: search ? "initial" : 30,
          mb: 10,
        }}
      >
        <Grid
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          alignItems="stretch"
        >
          {albums.map((album, index) => {
            const { name, artistName, id } = album;
            return (
              <AlbumCard title={name} artist={artistName} key={index} id={id} />
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default AlbumsContainer;
