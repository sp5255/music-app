import { ContrastRounded } from "@mui/icons-material";
import { CardMedia, Paper, Stack, Toolbar, Typography } from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";
import SongTable from "./SongTable";

const AlbumPage = () => {
    const params = useParams();
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState();
    const [albumImages, setAlbumImages] = useState([]);

    useEffect(() => {
        (async () => {
            const album_url = `${BASE_URL}/v2.2/albums/${params.id}`
            const resp = await fetch(`${album_url}?apikey=${API_KEY}`);
            const result = await resp.json();
            console.log('albums res', result);
            setAlbum(result?.albums[0]);
        })()
    },[params?.id])


    useEffect(() => {
        if(!album)
            return;
        (async () => {
            const resp = await fetch(`${album?.links?.images?.href}?apikey=${API_KEY}`);
            const result = await resp.json();
            console.log('image', result);
            setAlbumImages(result?.images[0]);
        })()
    },[album])

    useEffect(() => {
        (async () => {
            const album_tracks_url = `${BASE_URL}/v2.2/albums/${params.id}/tracks`;
            const resp = await fetch(`${album_tracks_url}?apikey=${API_KEY}`);
            const res = await resp.json();                        
            setSongs(res?.tracks);
        })();
    },[params?.id]);

    // console.log(albumImages[0].url);y
    console.log('set songs',songs);
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
                    background: "rgb(32, 152, 208)",
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

                        background:
                            "linear-gradient(transparent 0,rgba(0,0,0,.5) 100%)",
                    }}
                    alignItems="flex-end"
                >
                    <Paper
                        elevation={15}
                        sx={{ width: "200px", height: "200px" }}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={albumImages?.url}
                            alt="green iguana"
                        />
                    </Paper>
                    <Stack sx={{ pl: 2 , color:"white"}}>
                        <Typography variant="h5" sx ={{mb:0, fontWeight: "bold"}}>Playlist</Typography>
                        <Typography variant="h4" sx = {{fontWeight: "bold"}}>{album?.name}</Typography>
                        <Typography sx = {{ mb: 2, }}>{album?.artistName} </Typography>
                        <Typography variant="caption">{album?.copyright}</Typography>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        background:
                            "linear-gradient(rgba(0,0,0,.6) 0,#121212 100%)",
                        p: 3,
                    }}
                >
                    <Box>Icons</Box>
                        <SongTable songList = {songs}/>
                </Box>
            </Box>
        </>
    );
};

export default AlbumPage;
