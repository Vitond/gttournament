import Section from "../../../../components/layout/Section/Section";
import classes from './ThisYear.module.scss';
import Heading from "../../../../components/typography/Heading";
import { useMediaQuery } from "react-responsive";
import Paragraph from "../../../../components/typography/Paragraph";
import { headingTypes } from "../../../../types/types";
import TimeAxis from "../../../../components/other/TimeAxis/TimeAxis";
import { GAMETYPES } from "../../../../types/types";
import GameLogo from "../../../../components/other/GameLogo/GameLogo";
import rocketImage from '../../../../assets/rocket-wallpaper.webp';
import lolImage from '../../../../assets/lol-wallpaper.jpg';
import minecraftImage from '../../../../assets/minecraft-wallpaper.webp';
import valorantImage from '../../../../assets/valorant-wallpaper.webp';
import counterImage from '../../../../assets/counter-wallpaper.webp';

import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';


const schedule = [
    {
        date: '19.11.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
            {
                game: GAMETYPES.VALORANT,
                segments: [
                    { 
                        beginTime: '12:00',
                        endTime: '18:00'
                    }
                ]
            },
     ]   
    },
    
    {
        date: '20.11.2022',
        description: '',
        events: [
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '18:00'
                    }
                ]
            },
          
     ]   
    },

    {
        date: '26.11.2022',
        description: 'Zápas ve hře Minecraft, kvalifikace Rocket League, semifinále CS:GO',
        events: [
            {
                game: GAMETYPES.MINECRAFT,
                segments: [
                    { 
                        beginTime: '10:00',
                        endTime: '15:00'
                    }
                ]
            },
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    { 
                        beginTime: '14:00',
                        endTime: '18:00'
                    }
                ]
            },
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
     ]   
    },

    {
        date: '27.11.2022',
        description: 'Finále her Rocket League, League of Legends, CS:GO. Od 10:45 do 11:45 semifinále hry League of Legends.',
        events: [
            {
                game: GAMETYPES.ROCKET_LEAGUE,
                segments: [
                    { 
                        beginTime: '9:00',
                        endTime: '10:00'
                    }
                ]
            },
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '10:45',
                        endTime: '11:45'
                    }
                ]
            },
            {
                game: GAMETYPES.COUNTER_STRIKE,
                segments: [
                    { 
                        beginTime: '12:00',
                        endTime: '15:00'
                    }
                ]
            },
            {
                game: GAMETYPES.LOL,
                segments: [
                    { 
                        beginTime: '15:00',
                        endTime: '18:00'
                    }
                ]
            },
     ]   
    },
]


const ThisYear = () => {
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
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
        } else if (event.game === GAMETYPES.VALORANT) {
            backgroundImages.push(valorantImage);
        }
    })
    const backgroundElements = backgroundImages.map((imgSrc, id) => {
        const count = backgroundImages.length;
        return  <div 
                    key={id}
                    className={classes.ThisYear__imageDiv}
                    style={!isMobile ? {
                        position: 'absolute',
                        transform: `translateX(${id*100/count-10}%)`,
                        clipPath: `polygon(20% 0, calc((100%/${count}) + 20%) 0, calc((100%/${count})) 100%, 0 100%)`,
                        zIndex: -(id + 1)
                    } : {
                        position: 'relative'
                    }}
                    >
                    <img 
                        className={classes.ThisYear__backgroundImage}
                        src={imgSrc}>
                    </img>
                </div>
    });
    const descriptionElements = schedule[currentDay].events.map((event, id) => {
        const times = event.segments.map((segment, id) => { 
            return <div key={id} className={classes.ThisYear__description__time}>    
                <p>{segment.beginTime} - {segment.endTime}</p>
            </div>
        });
        const count = backgroundElements.length;
        return <div className={classes.ThisYear__description}
                key={id}
                style={!isMobile ? {
                    left: `${id*100/count+8}%`,
                    top: 0
                } : {
                    left: '5%',
                    top: `${id*100/count}%`
                }}
            >
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

