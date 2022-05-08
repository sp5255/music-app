import { Typography, Grid, TableCell, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";
import AlbumCard from "./AlbumCard";
import AlbumsContainer from "./AlbumsContainer";
import SongTable from "./SongTable";
import BasicTabs from "./Tabs";

const SearchResult = () => {
    const [data, setData] = useState({});
    const { query } = useParams();
    const search_base_url = `${BASE_URL}/v2.2/search?apikey=${API_KEY}`;

    useEffect(() => {
        (async (e) => {
            const resp = await fetch(
                // `${search_base_url}&per_type_limit=5&query=${query}`
                `${search_base_url}&query=${query}`
            );
            const res = await resp.json();
            // console.log("search res", res);
            setData(res?.search?.data);
        })();
    }, [query]);

    console.log(data);
    return (
        <Container  sx = {{ mt:10 }}>      

        <BasicTabs
        one = {data?.tracks && < SongTable songList={data?.tracks} />} 
        two = {data?.albums && <AlbumsContainer albums = {data?.albums} search/>}
         />
                   
            {/* {data?.albums && <AlbumsContainer albums = {data?.albums} /> } */}
                                    
        </Container> 
    );
};

export default SearchResult;
