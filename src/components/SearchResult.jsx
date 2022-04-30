import { Typography, Grid, TableCell, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";
import AlbumCard from "./AlbumCard";
import SongTable from "./SongTable";

const SearchResult = () => {
    const [data, setData] = useState({});
    const { query } = useParams();
    const search_base_url = `${BASE_URL}/v2.2/search?apikey=${API_KEY}`;

    useEffect(() => {
        (async (e) => {
            const resp = await fetch(
                `${search_base_url}&per_type_limit=5&query=${query}`
            );
            const res = await resp.json();
            console.log("search res", res);
            setData(res?.search?.data);
        })();
    }, [query]);

    console.log(data);
    return (
        <div>
            <Typography variant="h5">Albums</Typography>
            <Grid container sx = {{ml:31, mt:4}}   columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                {data?.albums?.map((album) => {
                    const { name, artistName, id } = album;

                    return(                    
                        <AlbumCard
                            title={name}
                            artist={artistName}
                            id={id}
                            key={id}
                        />                        
                    )
                })}
            </Grid>
            <Container maxWidth = "md" sx ={{ml:32, background:"black"}}>
            {data?.tracks && < SongTable songList={data?.tracks} />}
            </Container>
        </div> 
    );
};

export default SearchResult;
