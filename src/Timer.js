import { useState, useEffect } from "react";

const SECOND = 1_000;

export default function Timer(minutes, interval = SECOND) {
  const [timespan, setTimespan] = useState(new Date(minutes * 60 * interval));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  useEffect(() => {
    setTimespan(new Date(minutes * 60 * interval));
  }, [minutes, interval]);

  return {
    seconds: Math.floor(timespan / SECOND)
  };
}