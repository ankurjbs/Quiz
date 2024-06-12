import { useEffect, useState } from "react";

export default function ProgressBar({ timeout, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('set time out');
    const timer = setTimeout(onTimeOut, timeout);
    return ()=>{
      clearTimeout(timer);
    };
  }, [timeout,onTimeOut]);

  useEffect(() => {
    console.log('set interval');
   const interval =  setInterval(() => {
      setRemainingTime((prev) => prev - 100);
    }, 100);

    return ()=>{
      clearInterval(interval);
    }
  }, []);
  return (
    <>
      <progress value={remainingTime} max={timeout}></progress>
    </>
  );
}
