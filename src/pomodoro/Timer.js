import React from "react";
import {minutesToDuration} from "../utils/duration";
import {secondsToDuration} from "../utils/duration";

export default function Timer(props) {
    const{ activeSession, focusMode, timerMinutes, timerSeconds, focusDuration, breakDuration } = props;

    function percentage(currentMinutes, currentSeconds, initialMinutes) {
        return 100-(((currentMinutes*60) + currentSeconds)/(initialMinutes*60)*100);
    }

    return (
        <div style={activeSession ? {display: "block"} : {display: "none"}}>
            <div className="row mb-2">
                <div className="col">
                    <h2 data-testid="session-title">{focusMode ? "Focusing" : "On Break"} for {focusMode ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)} minutes</h2>
                    <p className="lead" data-testid="session-sub-title">
                        {secondsToDuration((timerMinutes * 60) + timerSeconds)} remaining...
                    </p>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <div className="progress" style={{ height: "30px" }}>
                        <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={focusMode ? percentage(timerMinutes, timerSeconds, focusDuration):percentage(timerMinutes, timerSeconds, breakDuration)}
                        style={{ width: `${focusMode ? percentage(timerMinutes, timerSeconds, focusDuration):percentage(timerMinutes, timerSeconds, breakDuration)}%` }}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }