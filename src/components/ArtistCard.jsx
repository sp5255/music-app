import { Avatar, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../contants";

const ArtistCard = ({ artist }) => {
  const href = artist?.href;
  const name = artist?.name;
  const [imageSrc, setImageSrc] = useState();
  const navigate = useNavigate();
  console.log(artist);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch(`${href}/images?apikey=${API_KEY}`);
        const result = await res.json();
        setImageSrc(result?.images[0]?.url);
      })();
    } catch (e) {
      console.log(e);
    }
  }, [href]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "fit-content",
        p: 2,
        maxWidth: 167,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => {
        navigate(`/artist/${artist?.id}`);
      }}
    >
      <Avatar
        alt={name}
        src={imageSrc}
        sx={{
          width: 160,
          height: 165,
        }}
      >
        {name.split(" ")[0][0] + " " + name.split(" ")[1][0]}
      </Avatar>
      <Typography variant="h6" sx={{ maxWidth: "100%" }}>
        {name.slice(0, 17)}
      </Typography>
      <Typography variant="caption">Artist</Typography>
    </Paper>
  );
};

export default ArtistCard;
