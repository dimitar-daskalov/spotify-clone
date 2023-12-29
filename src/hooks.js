import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "./redux/features/playerSlice";

export const usePlayPause = () => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, data, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  return { handlePauseClick, handlePlayClick };
};
