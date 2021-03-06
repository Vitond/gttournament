import Section from "../../../../components/layout/Section/Section";
import classes from './ThisYear.module.scss';
import Heading from "../../../../components/typography/Heading";
import Paragraph from "../../../../components/typography/Paragraph";
import { headingTypes } from "../../../../types/types";
import TimeAxis from "../../../../components/other/TimeAxis/TimeAxis";
import { GAMETYPES } from "../../../../types/types";
import GameLogo from "../../../../components/other/GameLogo/GameLogo";
import rocketImage from '../../../../assets/rocket-wallpaper.webp';
import lolImage from '../../../../assets/lol-wallpaper.jpg';
import minecraftImage from '../../../../assets/minecraft-wallpaper.webp';
import counterImage from '../../../../assets/counter-wallpaper.webp';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';


const schedule = [
    {
        date: '17.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    { 
                        beginTime: '16:00',
                        endTime: '21:00'
                    }
                ]
            },
     ]   
    },
    
    {
        date: '18.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '14:00',
                        endTime: '21:00'
                    }
                ]
            },
     ]   
    },

    {
        date: '19.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '14:00',
                        endTime: '21:00'
                    }
                ]
            },
     ]   
    },

    {
        date: '24.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.MINECRAFT,
                segments: [
                    { 
                        beginTime: '16:00',
                        endTime: '21:00'
                    }
                ]
            },
     ]   
    },

    {
        date: '25.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '14:00',
                        endTime: '21:00'
                    }
                ]
            },
     ]   
    },

    {
        date: '26.6.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '12:00'
                    }
                ]
            },
     ]   
    }

]


const ThisYear = () => {
    const [currentDay, setCurrentDay] = useState(0);
    let backgroundImages: string[]  = [];
    schedule[currentDay].events.forEach((event) => {
        if (event.game === GAMETYPES.COUNTER_STRIKE) {
            backgroundImages.push(counterImage);
        } else if (event.game === GAMETYPES.MINECRAFT) {
            backgroundImages.push(minecraftImage);
        } else if (event.game === GAMETYPES.LOL) {
            backgroundImages.push(lolImage);
        } else if (event.game === GAMETYPES.ROCKET_LEAGUE) {
            backgroundImages.push(rocketImage);
        }
    })
    const backgroundElements = backgroundImages.map((imgSrc, id) => {
        let BGclassName = '';
        if (backgroundImages.length > 1) {
            BGclassName = classes.ThisYear__backgroundImage + " " + (id === 0 ? classes.ThisYear__backgroundImage_0 : classes.ThisYear__backgroundImage_1);
        } else {
            BGclassName = classes.ThisYear__backgroundImage;
        }
        return <div className={classes.ThisYear__imageDiv}><img className={BGclassName} src={imgSrc}></img></div>
    });
    const descriptionElements = schedule[currentDay].events.map((event) => {
        const times = event.segments.map((segment) => { 
            return <div className={classes.ThisYear__description__time}>    
                <p>{segment.beginTime} - {segment.endTime}</p>
            </div>
        });
        return <div className={classes.ThisYear__description}>
            <GameLogo className={''} game={event.game}></GameLogo>
            <div className={classes.ThisYear__description__times}>
                {times}
            </div>
        </div>
    });
    return <Section className={classes.ThisYear}>
                <AnimatePresence exitBeforeEnter={true}>
                    <motion.div key={currentDay} initial={{y: '-100%', opacity: 0}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '100%'}} transition={{duration: 0.5}}className={classes.ThisYear__dynamic}>
                        <div className={classes.ThisYear__background}>
                            {backgroundElements}
                        </div>
                        <div className={classes.ThisYear__content}>
                            <Heading className={classes.ThisYear__heading} type={headingTypes.h1}>{schedule[currentDay].date}</Heading>
                            <Paragraph className={classes.ThisYear__paragraph}>
                                {schedule[currentDay].description}
                            </Paragraph>
                            <div className={classes.ThisYear__descriptions}>
                                {descriptionElements}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <TimeAxis schedule={schedule} currentDay={currentDay} setCurrentDay={setCurrentDay} className={classes.ThisYear__timeAxis}></TimeAxis>
            </Section>
};

export default ThisYear;

