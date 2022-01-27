import classes from './Row.module.scss';
import React from 'react';

interface RowProps {
    className?: string
}

const Row: React.FC<RowProps> = props => {
    return <div className={[classes.Row, props.className].join(' ')}>
        {props.children}
    </div>
};

export default Row;