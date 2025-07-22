import { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../utils/UploadTacMap";

const initialSetup = {
  map: "",
  title: "",
  side: "CT",
  type: "default",
  early: { description: "", tacmap: "/placeholder.svg", playerInfo: {} },
  mid: { description: "", tacmap: "/placeholder.svg", playerInfo: {} },
  late: { description: "", tacmap: "/placeholder.svg", playerInfo: {} },
};

function setupReducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "SET_MAP":
      return { ...state, map: action.payload };

    case "SET_SIDE":
      return { ...state, side: action.payload };

    case "SET_TYPE":
      return { ...state, type: action.payload };

    case "LOAD_SETUP":
      return { ...action.payload };

    case "CLEAR_SETUP":
      return null;

    case "SET_DESCRIPTION":
      return {
        ...state,
        [action.roundTime]: {
          ...state[action.roundTime],
          description: action.payload,
        },
      };

    case "SET_PLAYER_JOB":
      return {
        ...state,
        [action.roundTime]: {
          ...state[action.roundTime],
          playerInfo: {
            ...state[action.roundTime].playerInfo,
            [action.player]: action.payload,
          },
        },
      };

    case "SET_TACMAP":
      return {
        ...state,
        [action.roundTime]: {
          ...state[action.roundTime],
          tacmap: action.payload,
        },
      };

    case "INIT_SETUP":
      return action.payload;

    default:
      return state;
  }
}

export default function useSetup() {
  const [setup, dispatch] = useReducer(setupReducer, null);
  const [selectedRoundTime, setSelectedRoundTime] = useState("early");
  const [selectedPlayer, setSelectedPlayer] = useState(1);

  const initializeEmptySetup = () => {
    dispatch({ type: "INIT_SETUP", payload: initialSetup });
  };

  const updateTitle = (title) =>
    dispatch({ type: "SET_TITLE", payload: title });

  const updateDescription = (text) =>
    dispatch({
      type: "SET_DESCRIPTION",
      roundTime: selectedRoundTime,
      payload: text,
    });

  const updatePlayerJob = (text) =>
    dispatch({
      type: "SET_PLAYER_JOB",
      roundTime: selectedRoundTime,
      player: selectedPlayer,
      payload: text,
    });

  async function updateTacMap(image, setupId) {
    if (!image) return;

    try {
      const url = await uploadImage(setupId, image, selectedRoundTime);

      dispatch({
        type: "SET_TACMAP",
        roundTime: selectedRoundTime,
        payload: url,
      });

      toast("Uploaded successfully!");
    } catch (e) {
      console.error(e);
      toast("Upload failed :(");
    }
  }

  return {
    setup,
    dispatch,
    updateTacMap,
    selectedRoundTime,
    setSelectedRoundTime,
    selectedPlayer,
    setSelectedPlayer,
    updateTitle,
    updateDescription,
    updatePlayerJob,
    initializeEmptySetup,
  };
}
