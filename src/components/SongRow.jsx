import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconButton, Slider, Stack, Paper, Fab } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";
import { SET_PLAY_NOW } from "../actions";
import { API_KEY, BASE_URL } from "../contants";
import { HdrStrongOutlined } from "@mui/icons-material";

const SongRow = ({ song, ind }) => {
    const [isHover, setHover] = useState(false);
    let min = parseInt(song?.playbackSeconds / 60);
    min = min < 10 ? `0${min}` : min;
    let sec = parseInt(song?.playbackSeconds % 60);
    sec = sec < 10 ? `0${sec}` : sec;

    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("");
    useEffect(() => {
        (async () => {
            const image_base_url = `${BASE_URL}/v2.2/albums/${song.albumId}/images`;
            const resp = await fetch(`${image_base_url}?apikey=${API_KEY}`);
            const { images } = await resp.json();
            setImageUrl(images[1].url);
        })();
    }, [song]);

    // console.log("hover", isHover, ind);

    return (
        <>
            <TableRow
                key={song.id}
                hover={true}
                sx={{
                    "&:last-child td, &:last-child th": {
                        border: 0,
                    },
                    "&:hover": {
                        background: "rgb(189 189 189 / 15%) !important",
                    },
                }}
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
            >
                <TableCell>
                    {isHover ? (
                        <IconButton
                            color="primary"
                            aria-label="play"
                            size="medium"
                            sx = {{margin:-2, background:"grey", "&:hover" :{
                                background:"grey"
                            } }}
                            // onClick={togglePlayerStatus}

                            onClick = {() => dispatch(SET_PLAY_NOW(song))}

                        >
                            {/* {isPlaying ? (
                                <PauseIcon fontSize="medium" />
                            ) : ( */}
                                <PlayArrowIcon fontSize="inherit"  />
                            {/* )} */}
                        </IconButton>
                    ) : (
                        ind + 1
                    )}
                </TableCell>
                <TableCell >
                    <img src ={imageUrl} alt = "song" width="38" style={{borderRadius:".2rem"}}/>
                </TableCell>
                <TableCell>{song.name}</TableCell>
                <TableCell align="right">{song.artistName}</TableCell>
                <TableCell align="right">{song.albumName}</TableCell>
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
                {/* <TableCell align="right">{row.calories}</TableCell> */}
                {/* <TableCell align="right">{row.fat}</TableCell> 
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
        </>
    );
};

export default SongRow;
