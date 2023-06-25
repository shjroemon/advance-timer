import { useState, useRef, useEffect } from "react";

const useTimer = (ini = 0) => {
  const [time, setTime] = useState(ini); 

  const isStart = useRef(false); 
  const active = useRef(null); 
  const refInterval = useRef(null); 

  const startTimer = () => {
    if (!isStart.current) {
      refInterval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); 

      isStart.current = true; 
      active.current.disabled = true; 
    }
  };

  const stopTimer = () => {
    clearInterval(refInterval.current); 
    isStart.current = false; 
    active.current.disabled = false; 
  };

  const resetTimer = () => {
    setTime(ini); 
    active.current.disabled = false; 
  };

  useEffect(() => {
    return () => {
      clearInterval(refInterval.current);
    };
  }, []);

  return { time, startTimer, stopTimer, resetTimer, active };
};

export default useTimer;
