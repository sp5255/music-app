import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

export default function SongProgressBar(props) {
    const changePlayerCurrentTime = (e, newValue) => {
        props?.setTime(() => {
            const audioPlayer = props?.audioRef;
            if (audioPlayer) audioPlayer.current.currentTime = newValue;
            return newValue;
        });
    };

    return (
        <Box width={500} height={30}>
            <Slider
                size="small"
                defaultValue={0}
                value={props?.time}
                aria-label="Small"
                valueLabelDisplay="auto"
                sx={{ height: 4 }}
                min={0}
                max={30}    
                onChange={changePlayerCurrentTime}
            />            
        </Box>
    );
}
