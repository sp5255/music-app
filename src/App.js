import AlbumsContainer from "./components/AlbumsContainer";
import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "./contants";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import Player from "./components/Player";
import { Route, Routes } from "react-router-dom";
import AlbumPage from "./components/AlbumPage";
import SearchResult from "./components/SearchResult";
import ArtistPage from "./components/ArtistPage";
import TopAlbums from "./components/TopAlbums";

function App() {
  const [newReleases, setNewRelease] = useState([]);

  useEffect(() => {
    try{
    (async () => {
      const resp = await fetch(`${BASE_URL}/v2.2/albums/new?apikey=${API_KEY}`);
      const result = await resp.json();
      setNewRelease(result.albums);
    })();
  }
  catch(e){
    console.log(e);
  }
  }, []);

  return (
    <>
      <TopNav />
      <SideNav />
      <Player />
      <Routes>
        <Route path="/" element={<AlbumsContainer albums={newReleases} />} />
        <Route path="/top-albums" element={<TopAlbums />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
      </Routes>
    </>
  );
}

export default App;
