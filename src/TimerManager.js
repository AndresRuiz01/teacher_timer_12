import { useState, useEffect } from "react";
import Timer from "./Timer";
import './TimerManager.css'


function TimerManager({timers}) {

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


  var percentageComplete = (817 - ((seconds / (timers[currentTimerIndex].length * 60)) * 817))

  return (
    <div onClick={() => {setIsAudioActive(true)}}>
      {!isAudioActive && <div className="timerInfo">Click timer to Activate Audio</div>}
      {isTimersDone && <div>Timers are Complete</div>}
      <audio className="audio-element">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3" type="audio/wav"></source>
      </audio>
      <div className="timerInfo">
        {/* <div>{currentTimerTitle}</div>
        <div>{seconds}</div> */}
      </div>
      {!isTimersDone && <div>
        <div className="skill">
          <div className="outer">
            <div className="inner">
              <div className="time">{stringTime}</div>
              <div className="title">{currentTimerTitle}</div>
            </div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50vw" height="50vh">
          {/* <defs> */}
              {/* <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#e91e63" />
                <stop offset="100%" stop-color="#673ab7" />
              </linearGradient> */}
          {/* </defs> */}
          {/* <circle cx="100" cy="100" r="90" /> */}
          {/* <circle cx="25vh" cy="25vh" r="45%" style={{strokeDashoffset: percentageComplete}}/> */}
          {/* <circle cx="50vw" cy="50vh" r="20%"/> */}
          {/* <circle cx="25vw" cy="25vh" r="220" style={{strokeDashoffset: percentageComplete}}/> */}
          <circle cx="25vw" cy="25vh" r="130" style={{strokeDashoffset: percentageComplete}}/>
          {/* <circle cx="25vw" cy="25vh" r="130"/> */}
        </svg>
      </div>}

    </div>
  );
}

export default TimerManager;
