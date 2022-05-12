import { Avatar, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../contants";

const ArtistCard = ({artist}) => {
    const link = artist?.links;
    const name = artist?.name;
    const [imageSrc, setImageSrc] = useState();
    console.log(link)

    useEffect(() => {
        (async() =>{
            // const res = await fetch(`${link?.images?.href}?apikey=${API_KEY}`)        
            // console.log('artist img', res)
        })()
    })


  return (
    <Paper elevation={3} sx={{ width: "fit-content", p: 2 , maxWidth:167}}>
      <Avatar
        src="http://static.rhap.com/img/170x170/0/9/9/1/30681990_170x170.jpg"
        sx={{
          width: 165,
          height: 170,          
        }}
      />
      <Typography variant="h6" sx = {{maxWidth:"100%"}}>{name}</Typography>
      <Typography variant="caption">Artist</Typography>
    </Paper>
  );
};

export default ArtistCard;
