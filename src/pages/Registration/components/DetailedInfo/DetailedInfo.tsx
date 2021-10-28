import classes from './DetailedInfo.module.scss';
import React from 'react';

interface DetailedInfoProps {

}

const DetailedInfo: React.FC<DetailedInfoProps> = props => {
    return <p className={classes.DetailedInfo}>
        {props.children}
    </p>
};

export default DetailedInfo;