import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLAY_NOW } from "../actions";
import { API_KEY, BASE_URL } from "../contants";
import { Link } from "react-router-dom";

const SongRow = ({ song, ind, album }) => {
  const [isHover, setHover] = useState(false);
  let min = parseInt(song?.playbackSeconds / 60);
  min = min < 10 ? `0${min}` : min;
  let sec = parseInt(song?.playbackSeconds % 60);
  sec = sec < 10 ? `0${sec}` : sec;

  const dispatch = useDispatch();
  const currentSong = useSelector((store) => store.playingNow);
  const [imageUrl, setImageUrl] = useState("");
  const [rowSongPlaying, setRowSong] = useState(false);

  useEffect(() => {
    (async () => {
      const image_base_url = `${BASE_URL}/v2.2/albums/${song.albumId}/images`;
      const resp = await fetch(`${image_base_url}?apikey=${API_KEY}`);
      const { images } = await resp.json();
      setImageUrl(images[1].url);
    })();
  }, [song]);

  useEffect(() => {
    setRowSong(currentSong.id === song.id);
  }, [currentSong, song]);
  // console.log("hover", isHover, ind);-

  return (
    <>
      <TableRow
        key={song.id}
        hover={!rowSongPlaying}
        sx={{
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          "&:hover": {
            background: !rowSongPlaying ?  "rgb(189 189 189 / 15%) !important" : null,
            cursor:"pointer"
          },

          background:rowSongPlaying ? "#1976d224" : "initial"
        }}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <TableCell>
          {isHover && !rowSongPlaying ? (
            <IconButton
              color="primary"
              aria-label="play"
              size="medium"
              sx={{
                margin: -2,
                background: "#efefef",
              }}
              // onClick={togglePlayerStatus}

              onClick={() => dispatch(SET_PLAY_NOW(song))}
            >
              <PlayArrowIcon fontSize="inherit" />
            </IconButton>
          ) : (
            ind + 1
          )}
        </TableCell>
        <TableCell>
          <img
            src={imageUrl}
            alt="song"
            width="38"
            style={{ borderRadius: ".2rem" }}
          />
        </TableCell>
        <TableCell>{song.name}</TableCell>
        <TableCell align="right">
          {album ? (
            <Link to={`/artist/${song?.artistId}`}>{song.artistName}</Link>
          ) : (
            song.artistName
          )}
        </TableCell>
        <TableCell align="right">
          {!album ? (
            <Link to={`/albums/${song?.albumId}`}>{song.albumName}</Link>
          ) : (
            song.albumName
          )}
        </TableCell>
        <TableCell align="right">
          {/*   <button
                                    style={{ background: "black" }}
                                    onClick={() => {
                                        console.log(song);
                                        dispatch(SET_PLAY_NOW(song));
                                    }}
                                >
                                    Play
                                </button> */}
          {min} : {sec}
        </TableCell>
      </TableRow>
    </>
  );
};

export default SongRow;
