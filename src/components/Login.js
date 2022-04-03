import { CLIENT_ID } from "../contants";

const Login = (props) => {
    const AUTHORIZE_BASE_URL = "https://accounts.spotify.com/authorize?";
    const redirect_uri = "http://localhost:3000/";
    const client_id = CLIENT_ID;
    const scope = ["user-read-private", "user-read-email"];

    const handleClick = () => {
        window.location = `${AUTHORIZE_BASE_URL}client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
            "%20"
        )}&response_type=token&show_dialog=true`;
    };

    return (
        <>
            <h2>Login components</h2>
            <button onClick={handleClick}>Login</button>
        </>
    );
};

export default Login;
