export const CLIENT_ID = "428a260d07be407b8cf07f7802198ce2";
export const  CLIENT_SECRET = "428a260d07be407b8cf07f7802198ce2";
export const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const getAuthInfoFromUrl = () => {
    const tokenInfo = {}
    window.location.hash
        .substring(1)
        .split("&")
       .forEach(item => {
           const parts = item.split("=");
           tokenInfo[parts[0]] = parts[1];                   
       })          
       
       return tokenInfo;
};