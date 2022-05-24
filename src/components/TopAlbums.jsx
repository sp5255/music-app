import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../contants";
import AlbumsContainer from "./AlbumsContainer";

const TopAlbums = () => {
  const [topAlbums, setTopAlbums] = useState();

  useEffect(() => {
    try {
      (async () => {
        const resp = await fetch(
          `${BASE_URL}//v2.2/albums/top?apikey=${API_KEY}`
        );
        const { albums } = await resp.json();
        console.log("top albu", albums);
        setTopAlbums(albums);
      })();
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log("top albums", topAlbums);
  return <>{topAlbums && <AlbumsContainer albums={topAlbums} />}</>;
};

export default TopAlbums;
