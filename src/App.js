import Login from "./components/Login";
import Home from "./components/Home";
import { useState, useEffect } from "react";

function App() {
    const [token, setToken] = useState();

    // getting access_token, expiration etc. from url
    const getAuthInfoFromUrl = () => {
        const tokenInfo = {};
        window.location.hash
            .substring(1)
            .split("&")
            .forEach((item) => {
                const parts = item.split("=");
                tokenInfo[parts[0]] = parts[1];                
            });

        return tokenInfo;
    };

    useEffect(() => {
        const _token = getAuthInfoFromUrl().access_token;
        setToken(_token);
        window.location.hash = "";
    }, []);
    
    return <>{token ? <Home token={token} /> : <Login />}</>;
}

export default App;
