import "./Timer.css";
import {useEffect, useState} from "react";
const Timer = ({duration, onEndTimer, isStarted}) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timerId = null;
        timerId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime >= duration) {
                    clearInterval(timerId);
                    setIsActive(false);
                    onEndTimer();
                    return duration;
                }
                return prevTime + 1;
            });
        }, 1000);
    }, [time, isActive, duration, onEndTimer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <h1>{time}</h1>
    )
}

export default Timer;