import classes from './typography.module.scss';
import React from 'react';
import { headingTypes } from '../../types/types';

interface HeadingProps {
    className: string;
    type: headingTypes;
    onClick?: () => void
}

const Heading: React.FC<HeadingProps> = props => {
    let headingClassName = null;
    switch(props.type) {
        case headingTypes.h1:
            headingClassName = classes.Heading1;
            break;
        case headingTypes.h2:
            headingClassName = classes.Heading2;
            break;
        case headingTypes.main:
            headingClassName = classes.HeadingMain;
            break;
        case headingTypes.h3:
            headingClassName = classes.Heading3;
            break;
        default:
            headingClassName = classes.Heading1;
            break;
    }
    const className = props.className + " " + headingClassName;
    return <h1 onClick={() => {
        if (props.onClick) {
            props.onClick();
        }
    }}className={className}>
        {props.children}
    </h1>
};

export default Heading;