import React from "react";
import {minutesToDuration} from '../utils/duration';

export default function TwentyFiveMinSelect(props){
    const{ focusDuration, increaseFocusDuration, decreaseFocusDuration,} = props;
    
    return(
    <div className="col">
        <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
                Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
            <button 
            type="button" 
            className="btn btn-secondary" 
            data-testid="decrease-focus"
            onClick= {decreaseFocusDuration}
            >
                <span className="oi oi-minus" />
            </button>
            <button 
            type="button" 
            className="btn btn-secondary" 
            data-testid="increase-focus" 
            onClick={increaseFocusDuration}>
                <span className="oi oi-plus" />
            </button>
            </div>
        </div>
    </div>
    );
}