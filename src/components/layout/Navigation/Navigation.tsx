import classes from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import React from 'react';

interface NavigationProps {
    className?: string
}

const Navigation: React.FC<NavigationProps> = props => {
    const className = classes.Navigation + " " + props.className; 
    return <nav className={className}>
        <ul className={classes.Navigation__list}>
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
        </ul>
    </nav>
};

export default Navigation;