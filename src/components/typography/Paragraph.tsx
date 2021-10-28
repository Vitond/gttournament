import React from 'react';
import classes from './typography.module.scss';

interface ParagraphProps {
    className: string
}

const Paragraph: React.FC<ParagraphProps> = props => {
    const className = classes.Paragraph + " " + props.className;
    return <p className={className}>
        {props.children}
    </p>
};

export default Paragraph;