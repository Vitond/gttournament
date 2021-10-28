import React, { useState, useEffect } from 'react';
import classes from './CountDown.module.scss';

const nextEventTime = new Date(2021, 10, 17, 10).getTime();

interface CountDownProps {
    className: string
}

const CountDown: React.FC<CountDownProps> = props => {
    const [currentTime, setCurrentTime] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000)
        return () => {
            window.clearInterval(interval);
        }
    }, []);
    const timeDelta = nextEventTime - currentTime;
    const differenceDate = new Date(timeDelta);
    const days = Math.floor((differenceDate.getTime() / (1000 * 24 * 3600)))
    const hours = differenceDate.getHours();
    const seconds = differenceDate.getSeconds();
    const minutes = differenceDate.getMinutes();
    const className = classes.CountDown + " " + props.className;
    return <div className={className}>
        <div className={classes.CountDown__row}>
            <span className={classes.CountDown__number}>{days}</span> d <span className={classes.CountDown__number}>{hours}</span> h
        </div>
        <div className={classes.CountDown__row}>
            <span className={classes.CountDown__number}>{minutes}</span> min <span className={classes.CountDown__number}>{seconds}</span> s
        </div>
        <div className={classes.CountDown__row}>
           
        </div>
        <div className={classes.CountDown__row}>
           
        </div>
    </div>
};

export default CountDown;