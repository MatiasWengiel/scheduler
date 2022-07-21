import React, { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (secondState, skip = false) => {
    setMode(secondState);

    //If passed true as second argument, skips recording state to history so that the temporary state will be skipped if we use the back function
    if (skip === false) {
      setHistory(prev => [...prev, secondState]);
    }
  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2 ])
      setHistory(prev => [...prev.slice(0, -1)])
    }
  }


  return { mode, transition, back }
}

