import classes from './TimeAxis.module.scss';
import { GAMETYPES } from '../../../types/types';
import React, { useRef, useEffect, useCallback, useState, Dispatch, SetStateAction } from 'react';

interface TimeAxisProps {
    className: string,
    currentDay: number,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    schedule: {
            date: string,
            events: {
                    game: GAMETYPES,
                    segments: {
                            beginTime: string,
                            endTime: string
                    }[]
                    
            }[]
            
        }[]
}


const TimeAxis: React.FC<TimeAxisProps> = props => {
    const lineRef = useRef(document.createElement('div'));
    const schedule = props.schedule;

    const onResize = useCallback((pointElements: HTMLDivElement[], descriptorElements: HTMLDivElement[]) => {
        const width = lineRef.current.offsetWidth;
        pointElements.forEach((el, id) => {
            const offsetLeft = (width / (pointElements.length - 1)) * +el.dataset.id!;
            el.style.left = `${offsetLeft}px`;
        })
        descriptorElements.forEach((el, id) => {
            const offsetLeft = (width / (descriptorElements.length - 1)) * +el.dataset.id!;
            el.style.left = `${offsetLeft}px`;
        });
    }, []);

    useEffect(() => {
        const element = lineRef.current;
        if (element) {
            const descriptorElements = Array.from(element.querySelectorAll(`.${classes.TimeAxis__descriptor}`)) as HTMLDivElement[];
            const pointElements = Array.from(element.querySelectorAll(`.${classes.TimeAxis__point}`)) as HTMLDivElement[];
            onResize(pointElements, descriptorElements);
            const resizeHandler = () => {
                onResize(pointElements, descriptorElements);
            }
            window.addEventListener('resize', resizeHandler)
            return () => {
                window.removeEventListener('resize', resizeHandler);
            }
        }
    }, [])

    const className = classes.TimeAxis + " " + props.className;
    const points = schedule.map((day, id) => {
        const className = classes.TimeAxis__point  + " " + (id === props.currentDay ? classes.active : '');
        return <div onClick={
            () => {
                props.setCurrentDay(id);
            }
        } 
        data-id={id} key={id} className={className}></div>
    });
    const descriptors = schedule.map((day, id) => {
        return <div data-id={id} key={id} className={classes.TimeAxis__descriptor}>{day.date}</div>
    });
    
    return <div className={className}>
        <div ref={lineRef} className={classes.TimeAxis__line}>
            {points}
            {descriptors}
        </div>
    </div>
};

export default TimeAxis;