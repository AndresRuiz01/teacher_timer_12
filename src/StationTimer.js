import { useState, useEffect } from "react";
import Timer from "./Timer";
import './StationTimer.css'
import CircularProgress from '@mui/material/CircularProgress';


function StationTimer({timers}) {

  // const { seconds } = Timer(12);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0)
  const [currentTimerTitle, setCurrentTimerTitle] = useState("")
  const [isTimersDone, setIsTimersDone] = useState(false)
  const {seconds} = Timer(timers[currentTimerIndex].length)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [stringTime, setStringTime] = useState("")

  if (seconds === 0 && !isUpdating) {
    setIsUpdating(true)
    console.log("timer done, next timer", currentTimerIndex, timers.length -1 );
    if (currentTimerIndex === timers.length - 1) {
      console.log("last timer were done folks");
      setIsTimersDone(true)
    } else {
      setCurrentTimerIndex(currentTimerIndex + 1)
    }
  }

  useEffect(() => {
    var minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    var modSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    setStringTime(minutes + ":" + modSeconds)
  }, [seconds])

  useEffect(() => {
    if (isTimersDone) {
      repeatedAudio(5)
    }
  }, [isTimersDone])

  useEffect(() => {
    setIsUpdating(false)
    setCurrentTimerTitle(timers[currentTimerIndex].title)

    if (currentTimerIndex > 0) {
      repeatedAudio(3)
    }

  }, [currentTimerIndex])

  useEffect(() => {
    
  }, [])

  function repeatedAudio(n) {
    playAudio();
    var i = 0, 
    interval = setInterval(function() {
        playAudio();
        i++;
        if(i >= n-1) clearInterval(interval); // stop it
    }, 1000);
  }

  function playAudio() {
    var audio = new Audio('https://assets.coderrocketfuel.com/pomodoro-times-up.mp3')
    audio.load()
    const audioPromise = audio.play()
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err)
          console.log(audio)
        })
    }
  }

  var percentageComplete = (seconds / (timers[currentTimerIndex].length * 60)) * 100

  return (
    <div onClick={() => {setIsAudioActive(true)}}>
      {/* {!isAudioActive && <div className="timerInfo">Click timer to Activate Audio</div>} */}
      {isTimersDone && <div>Timers are Complete</div>}
      <audio className="audio-element">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" type="audio/wav"></source>
      </audio>
      {!isTimersDone && <div id="timer-container">
        {/* <div id="timer-info-container">
          <div className="time">{stringTime}</div>
          <div className="title">{currentTimerTitle}</div>
        </div> */}
        <div id="circular-timer">
          <CircularProgress color="inherit" size="min(calc(100vw - 20vw), calc(100vh - 20vh))" variant="determinate" value={percentageComplete} />
        </div>
      </div>}
    </div>
  );
}

export default StationTimer;
