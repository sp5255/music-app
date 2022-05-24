export const IS_PLAYING = (state) => {
  return {
    type: "IS_PLAYING",
    payload: state,
  };
};

export const SET_PLAY_NOW = (track) => {
  return {
    type: "SET_PLAY_NOW",
    payload: track,
  };
};

export const PLAYING_QUEUE = (tracks) => {
  return {
    type: "PLAYING_QUEUE",
    payload: tracks,
  };
};

export const CHANGE_SONG_NUMBER = (number) => {
  return {
    type: "CHANGE_SONG_NUMBER",
    payload: number,
  };
};
