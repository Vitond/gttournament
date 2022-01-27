import classes from './Label.module.scss';
import React from 'react';

interface LabelProps {
    className?: string,
    htmlFor?: string,
    obligatory?: boolean
}

const Label: React.FC<LabelProps> = props => {
    return <label htmlFor={props.htmlFor} className={[classes.Label, props.obligatory? classes.obligatory : '', props.className].join(' ')}>
        {props.children}
    </label>
};

export default Label;