import classes from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence} from 'framer-motion';
import YoutubeLogo from '../../../assets/youtube-logo.png'
import TwitchLogo from '../../../assets/twitch-logo.svg';
import React from 'react';

interface NavigationProps {
    className?: string
}

const Navigation: React.FC<NavigationProps> = props => {
    const isMobile = useMediaQuery({query: '(max-width: 900px)'});
    const className = classes.Navigation + " " + props.className; 
    const hideMobileNavigation = useCallback(() => {
        setIsMobileNavigationShown(false);
        document.removeEventListener('click', hideMobileNavigation);
    }, [])
    
    const toggleMobileNavigation = useCallback(() => {
        if (!isMobile) {
            return;
        }
        setIsMobileNavigationShown(true);
    }, [isMobile]);
    const [isMobileNavigationShown, setIsMobileNavigationShown] = useState(false);
    useEffect(() => {
        setIsMobileNavigationShown(false);
    }, [isMobile])
    useEffect(() => {
        if (isMobileNavigationShown) {
            document.addEventListener('click', hideMobileNavigation);
        }
    }, [isMobileNavigationShown])
   
    const displayItems = !isMobile || isMobileNavigationShown;
    return <nav className={[className, isMobile? classes.mobile : ''].join(' ')}>
        <AnimatePresence>
            {displayItems && <motion.ul key="navigation" initial={{x: '100%'}} animate={{x: 0}} exit={{x: '100%'}} className={[classes.Navigation__list, isMobile ? classes.mobile : '', isMobileNavigationShown ? classes.active : ''].join(' ')}>
                <li className={classes.Navigation__item}>
                    <NavLink exact activeClassName={classes.active} className={classes.Navigation__link} to="/">Domů</NavLink>
                </li>
                <li className={[classes.Navigation__item, classes.Navigation__item_registration].join(' ')}>
                    <NavLink activeClassName={classes.active} className={[classes.Navigation__link, classes.Navigation__link_registration].join(' ')} to="/registration">Registrace</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/contestants">Účastníci</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/sponsors">Sponzoři</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/rules">Pravidla</NavLink>
                </li>
                <li className={classes.Navigation__item}>
                    <NavLink activeClassName={classes.active} className={classes.Navigation__link} to="/documents">Dokumenty</NavLink>
                </li>
                <li className={classes.Navigation__item} onClick={() => {window.open("https://www.youtube.com/@gttournament/videos")}}>
                    <img className={classes.Navigation__youtubeLogo} src={YoutubeLogo}></img>
                </li>
                <li className={classes.Navigation__item} onClick={() => {window.open("https://www.twitch.tv/gttournament_a")}}>
                    <img className={classes.Navigation__twitchLogo} src={TwitchLogo}></img>
                </li>
            </motion.ul>}
        </AnimatePresence>
        {isMobile && <div onClick={() => {
            toggleMobileNavigation();
        }}className={classes.Navigation__hamburger}>
            <div className={classes.Navigation__hamburger__line}></div>
            <div className={classes.Navigation__hamburger__line}></div>
            <div className={classes.Navigation__hamburger__line}></div>
        </div>}
    </nav>
};

export default Navigation;