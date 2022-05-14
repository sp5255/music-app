import { Grid } from "@mui/material";
import React from "react";
import ArtistCard from "./ArtistCard";

const ArtitstContainer = ({ artists }) => {
  console.log("artists", artists);
  return (
    <Grid container rowSpacing={3} sx={{ mb: 10 }} alignItems="stretch">
      {artists &&
        artists.map((artist, ind) => {
          return (
            <Grid item xs={5} sm={4} md={3} lg={2}>
              <ArtistCard artist={artist} key={ind} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ArtitstContainer;
