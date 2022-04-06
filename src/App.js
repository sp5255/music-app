import AlbumsContainer from "./components/AlbumsContainer";
import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "./contants";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import Player from "./components/Player";
import { Route, Routes } from "react-router-dom";
import SongTable from "./components/SongTable";
import AlbumPage from "./components/AlbumPage";

function App() {
    const [newReleases, setNewRelease] = useState([]);

    useEffect(() => {
        (async () => {
            const resp = await fetch(
                `${BASE_URL}/v2.2/albums/new?apikey=${API_KEY}`
            );
            const result = await resp.json();
            setNewRelease(result.albums);
        })();
    },[]);

    return (
        <>
            <TopNav />
            <SideNav />
            <Player />            
            <Routes>
                
                <Route path="/" element = {<AlbumsContainer albums={newReleases} />} />
                <Route path="/albums/:id" element = {<AlbumPage />} />
            </Routes>            
        </>
    );
}

export default App;
