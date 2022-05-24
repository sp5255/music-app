import {
  Fab,
  CardMedia,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";
import SongTable from "./SongTable";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { IS_PLAYING, PLAYING_QUEUE } from "../actions";

const AlbumPage = () => {
  const params = useParams();
  const currentSong = useSelector((store) => store.playingNow);
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState();
  const [albumImages, setAlbumImages] = useState([]);
  const isPlaying = useSelector((store) => store.isPlaying);
  const [playerIcon, setPlayerIcon] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      (async () => {
        const album_url = `${BASE_URL}/v2.2/albums/${params.id}`;
        const resp = await fetch(`${album_url}?apikey=${API_KEY}`);
        const result = await resp.json();
        // console.log("albums res", result);
        setAlbum(result?.albums[0]);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [params?.id]);

  useEffect(() => {
    if (!album) return;
    try {
      (async () => {
        const resp = await fetch(
          `${album?.links?.images?.href}?apikey=${API_KEY}`
        );
        const result = await resp.json();
        // console.log("image", result);
        setAlbumImages(result?.images[0]);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [album]);

  useEffect(() => {
    try {
      (async () => {
        const album_tracks_url = `${BASE_URL}/v2.2/albums/${params.id}/tracks`;
        const resp = await fetch(`${album_tracks_url}?apikey=${API_KEY}`);
        const res = await resp.json();
        setSongs(res?.tracks);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [params?.id]);

  // change  icon above the table
  useEffect(() => {
    songs.forEach((song, ind) => {
      if (song.id === currentSong.id /* && isPlaying */) {
        setPlayerIcon(true);
        return;
      }

      // setPlayerIcon(false);
    });
  }, [currentSong, songs]);

  //   console.log("set songs", songs);
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
          // background: "rgb(32, 152, 208)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            widht: 100,
            height: "15rem",
            // border: "2px solid",
            p: 3,
            pb: 2,

            // background:
            //     "linear-gradient(transparent 0,rgba(0,0,0,.5) 100%)",
          }}
          alignItems="flex-end"
        >
          <Paper elevation={15} sx={{ width: "200px", height: "200px" }}>
            <CardMedia
              component="img"
              height="100%"
              image={albumImages?.url}
              alt="green iguana"
            />
          </Paper>
          <Stack sx={{ pl: 2 }}>
            <Typography variant="h5" sx={{ mb: 0, fontWeight: "bold" }}>
              Playlist
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {album?.name}
            </Typography>
            <Typography sx={{ mb: 2 }}>{album?.artistName} </Typography>
            <Typography variant="caption">{album?.copyright}</Typography>
          </Stack>
        </Box>
        <Box
        /* sx={{
                        background:
                            "linear-gradient(rgba(0,0,0,.6) 0,#121212 100%)",
                        p: 3,
                    }} */
        >
          <Stack direction="row" alignItems="center" sx={{ py: 4, pl: 2 }}>
            <Fab
              color="primary"
              aria-label="play"
              size="large "
              sx={{
                marginRight: "1rem",
              }}
              // onClick={togglePlayerStatus}
              onClick={() => {
                dispatch(PLAYING_QUEUE(songs));
                setPlayerIcon(true);
              }}
            >
              {playerIcon ? (
                <PauseIcon fontSize="medium" />
              ) : (
                <PlayArrowIcon sx={{ fontSize: "2rem" }} />
              )}
            </Fab>

            <FavoriteBorderIcon
              sx={{ fontSize: "3rem", marginRight: "1rem" }}
            />
            <MoreHorizIcon sx={{ fontSize: "3rem" }} />
          </Stack>
          <Divider sx={{ ml: 2, mb: 2 }} />
          <Box sx={{ pl: 2 }}>
            <SongTable songList={songs} album />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AlbumPage;
