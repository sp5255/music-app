const reducer = (state, action) => {    
        if(state === undefined){
            return {
                playingNow:''
            }
        }

        const {type, payload} = action;
        const newState = {...state};
        switch(type){            
            case "SET_PLAY_NOW":                
                newState.playingNow = payload;
                break;
            default:
                break;                
        }

        return newState;
}

export default reducer