const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isPlaying: false,
      playingNow: "",
      queue: [],
      queueSongNumber: 0,
    };
  }

  const { type, payload } = action;
  const newState = { ...state };
  // console.log("reducer", type, payload);
  

  switch (type) {
    case "IS_PLAYING":
      newState.isPlaying = payload;
      break;

    case "SET_PLAY_NOW":
      newState.playingNow = payload;

      newState?.queue?.map((song, ind) => {
        if (payload.id === song.id) return (newState.queueSongNumber = ind);
        return []
      });
      break;
    case "PLAYING_QUEUE":
      // console.log('playing queue')
      newState.queue = payload;
      newState.playingNow = payload[0];
      newState.queueSongNumber = 0;
      // console.log('queue',newState.queue)
      break;

    case "CHANGE_SONG_NUMBER":
      if (newState.queue.length > payload && payload >= 0) {
        newState.queueSongNumber = payload;
        newState.playingNow = newState?.queue[payload];
      }
      break;
    default:
      break;
  }
  console.log('action', type)
  console.log('store', newState)
  return newState;
};

export default reducer;
