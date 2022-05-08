import { React, useEffect, useRef, useState } from "react";
import SongProgressBar from "./SongProgressBar";
import { IconButton, Slider, Stack, Paper, Fab } from "@mui/material";
import { VolumeDown, VolumeUp } from "@mui/icons-material";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { useSelector } from "react-redux";
import { API_KEY, BASE_URL } from "../contants";

const Player = () => {
  const [volume, setVolume] = useState(20);
  const [isPlaying, setPlayingStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef(null);
  const currentSong = useSelector((store) => store.playingNow);
  const audio_url = currentSong?.previewURL;
  const [imageUrl, setImageUrl] = useState("");
  // const audio_url =
  //     "https://p.scdn.co/mp3-preview/6dbabf5a9743b9368e23a64738334d3cb183ddd8?cid=428a260d07be407b8cf07f7802198ce2";

  // whenever there is a change in volume in audio player,
  // change volume slider also
  useEffect(() => {
    audioPlayer.current.volume = volume / 100;
  }, [volume]);

  // setting the valume by slider
  const handleVolume = (event, newVolume) => {
    setVolume(newVolume);
  };

  // play and pause on clicking the respective button
  const togglePlayerStatus = () => {
    setPlayingStatus((currentStatus) => {
      if (!currentStatus) audioPlayer.current.play();
      else audioPlayer.current.pause();
      return !currentStatus;
    });
  };

  useEffect(() => {
    if (currentSong !== "") {
      setPlayingStatus(true);
      audioPlayer.current.play();
    }
  }, [currentSong]);

  // when audio is ended , stop playing --> set the state to false
  const stopPlaying = () => {
    setPlayingStatus(false);
  };

  // change the slider position A.T. audio player time
  const updatePlayerTime = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  useEffect(() => {
    (async () => {
      const image_base_url = `${BASE_URL}/v2.2/albums/${currentSong.albumId}/images`;
      const resp = await fetch(`${image_base_url}?apikey=${API_KEY}`);
      const { images } = await resp.json();
      setImageUrl(images[1].url);
    })();
  }, [currentSong]);

  // useEffect (() => {
  //     audioPlayer.current.currentTime = currentTime;
  // }, [currentTime])

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={8}
      >
        <audio
          src={audio_url}
          ref={audioPlayer}
          onTimeUpdate={updatePlayerTime}
          onEnded={stopPlaying}
        ></audio>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ px: 2 }}
          alignItems="center"
        >
          <Stack width="5rem">
            <img src={imageUrl} alt={currentSong.name} />
          </Stack>

          <Stack
            sx={{ ml: 20, mb: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <IconButton aria-label="prev">
                <SkipPreviousIcon fontSize="large" />
              </IconButton>

              <Fab
                color="primary"
                aria-label="play"
                size="small"
                onClick={togglePlayerStatus}
              >
                {isPlaying ? (
                  <PauseIcon fontSize="medium" />
                ) : (
                  <PlayArrowIcon fontSize="medium" />
                )}
              </Fab>
              <IconButton aria-label="next">
                <SkipNextIcon fontSize="large" />
              </IconButton>
            </Stack>
            <Stack>
              <SongProgressBar
                time={currentTime}
                setTime={setCurrentTime}
                audioRef={audioPlayer}
              />
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, width: 200 }}
            alignItems="center"
          >
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolume}
            />
            <VolumeUp />
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default Player;
