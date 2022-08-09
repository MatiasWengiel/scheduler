import { useState } from "react";

//Function handles which <Appointment /> mode to show (e.g. empty with an add button, existing, empty form, filled out form, etc)
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Transitions forward from different visual modes. Records them to history unless passed a value of true for "skip" parameter (used for async status messages like "Saving..." or "Deleting...")
  const transition = (secondState, skip = false) => {
    setMode(secondState);

    //If passed true as second argument, skips recording state to history so that the temporary state will be skipped if we use the back function. Used for async status notifications ("Saving..." or "Deleting...") that we do not need to return to if we encounter a server error
    if (skip === false) {
      setHistory((prev) => [...prev, secondState]);
    }
  };

  //Transitions back to the previous visual mode in the history
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
