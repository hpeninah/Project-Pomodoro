import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import TwentyFiveMinSelect from "./TwentyFiveMinSelect";
import FiveMinutesSelect from "./FiveMinutesSelect";
import classNames from "../utils/class-names";
import TimerDisplay from "./Timer";
import PlayPauseStop from "./PlayPauseStop";

function Pomodoro() {
  
  //Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [focusDuration, setFocusDuration] = useState(25);

  const [breakDuration, setBreakDuration] = useState(5);

  const [timerMinutes, setTimerMinutes] = useState(25);
  
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const [activeSession, setActiveSession] = useState(false);
  
  const [focusMode, setMode] = useState(true);
  
  function increaseFocusDuration(){
    if(activeSession === false){
      if (focusDuration < 60){
        setFocusDuration(focusDuration+5);
      }
    }
  }

  function decreaseFocusDuration(){
    if(activeSession === false){
      if (focusDuration > 5){
        setFocusDuration(focusDuration-5);
      }
    }
  }

  function increaseBreakDuration(){
    if(activeSession === false){
      if (breakDuration < 15){
        setBreakDuration(breakDuration+1);
      }
    }
  }
  
  function decreaseBreakDuration(){
    if(activeSession === false){
      if (breakDuration > 1){
        setBreakDuration(breakDuration-1);
      }
    }
  }

  useInterval(() => {
    setTimerSeconds((second) => {
      second === 0 ? second = 59 : second -= 1;
      if (second === 59){
      setTimerMinutes(minutes => minutes = timerMinutes - 1);
    }
    return second;
  });
  
  if(timerMinutes === 0 && timerSeconds === 1){
    timeExpired();
  }
}, isTimerRunning ? 1000 : null);

  function timeExpired(){

  if (focusMode){
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
    setMode(false);
    setTimerMinutes(breakDuration);
  }

  if (!focusMode){
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
    setMode(true);
    setTimerMinutes(focusDuration);
  }
}

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if(activeSession === false){
      startSession()
    }
  }

  function startSession(){
    setTimerMinutes(focusDuration);
    setTimerSeconds(0);
    setActiveSession(true);
  }
  
  function stopSession(){
    if(activeSession === true){
      setIsTimerRunning(false);
      setActiveSession(false);
      setTimerMinutes(focusDuration);
      setTimerSeconds(0);
      setMode(true);
    }
  }
  
  return (
  <div className="pomodoro">
    <div className="row">
      <TwentyFiveMinSelect focusDuration={focusDuration} decreaseFocusDuration={decreaseFocusDuration} increaseFocusDuration={increaseFocusDuration}/>
      <FiveMinutesSelect breakDuration={breakDuration} decreaseBreakDuration={decreaseBreakDuration} increaseBreakDuration={increaseBreakDuration}/>
    </div>
    <div className="row">
      <div className="col">
        <PlayPauseStop playPause={playPause} isTimerRunning={isTimerRunning} stopSession={stopSession} classNames={classNames}/>
      </div>
    </div>
    <TimerDisplay activeSession={activeSession} focusMode={focusMode} timerMinutes={timerMinutes} timerSeconds={timerSeconds} focusDuration={focusDuration} breakDuration={breakDuration}/>
  </div>
  );
}

export default Pomodoro;