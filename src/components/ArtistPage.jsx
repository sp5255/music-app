import React, { useEffect, useState } from "react";

import { CardMedia, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SongTable from "./SongTable";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";

const ArtistPage = () => {
  const params = useParams();
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState();
  const [artistImage, setArtistImage] = useState();

  useEffect(() => {
    try {
      (async () => {
        const image_base_url = `${BASE_URL}/v2.2/artists/${params?.id}/images`;
        const resp = await fetch(`${image_base_url}?apikey=${API_KEY}`);
        const { images } = await resp.json();
        setArtistImage(images[1].url);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [params?.id]);

  useEffect(() => {
    try {
      (async () => {
        const resp = await fetch(
          `${BASE_URL}/v2.2/artists/${params?.id}/tracks/top?apikey=${API_KEY}`
        );
        const { tracks } = await resp.json();
        console.log(tracks);
        setSongs(tracks);
        setArtist(tracks[0]?.artistName);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [params?.id]);

  return (
    <div>
      return (
      <>
        <Toolbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 0,
            ml: 30,
            mb: 10,            
          }}
        >
          <Box
            sx={{
              display: "flex",
              widht: 100,
              height: "15rem",
              p: 3,
              pb: 2,
            }}
            alignItems="flex-end"
          >
            <Paper elevation={15} sx={{ width: "200px", height: "200px" }}>
              <CardMedia
                component="img"
                height="100%"
                image={artistImage}
                alt="green iguana"
              />
            </Paper>
            <Stack sx={{ pl: 2 }}>
              <Typography variant="h5" sx={{ mb: 0, fontWeight: "bold" }}>
                Artist
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {artist}
              </Typography>
            </Stack>
          </Box>
          <Box>{songs && <SongTable songList={songs} />}</Box>
        </Box>
      </>
      );
    </div>
  );
};

export default ArtistPage;
