import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if (replace) {
      history[history.length - 1] = nextMode
    } else {
      history.push(nextMode);
    }

    setHistory([...history]);
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
