import classes from './Label.module.scss';
import React from 'react';

interface LabelProps {
    className?: string,
    htmlFor?: string
}

const Label: React.FC<LabelProps> = props => {
    return <label htmlFor={props.htmlFor} className={classes.Label}>
        {props.children}
    </label>
};

export default Label;