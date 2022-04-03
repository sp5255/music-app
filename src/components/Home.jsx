import SideNav from "./SideNav";
import TopNav from "./TopNav";
import Player from "./Player";
import SongsContainer from "./SongsContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = (props) => {
    const {token} = props;
    const [albums, setAlbums] = useState([]);
    // const Tracks_base_url = "https://api.spotify.com/v1/tracks"
    const new_releases_base_url = "https://api.spotify.com/v1/browse/new-releases";    

    useEffect(() => {
        (async() => {
            const resp = await fetch(new_releases_base_url,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            });
            const res = await resp.json();
            setAlbums(res?.albums?.items)
        })()
    },[])
    
    return (
        <>
            <TopNav />
            <SideNav />
            <Player />
            { albums.length > 0 &&  <SongsContainer data={albums} token = {token}/>}
        </>
    );
};

export default Home;
