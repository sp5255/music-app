import {  Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../contants";
import AlbumsContainer from "./AlbumsContainer";
import ArtistContainer from "./ArtistContainer";
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
      setData(res?.search?.data);
    })();
  }, [search_base_url,query]);

  console.log(data);
  return (
    <Box sx={{ mt: 10, pl: "15rem !important" }}>
      <BasicTabs
        one={data?.tracks && <SongTable songList={data?.tracks} />}
        two={data?.albums && <AlbumsContainer albums={data?.albums} search />}
        three={data?.artists && <ArtistContainer artists={data?.artists} />}
      />
      
    </Box>
  );
};

export default SearchResult;
