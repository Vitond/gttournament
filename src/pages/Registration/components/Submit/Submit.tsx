import React from 'react';
import CTA from '../../../../components/layout/CTA/CTA';
import classes from './Submit.module.scss';

interface SubmitProps {
    className?: string,
    onClick?: Function
}

const Submit: React.FC<SubmitProps> = props => {
    return <CTA onClick={props.onClick} className={[classes.Submit, props.className].join(' ')}>
        Odeslat přihlášku
    </CTA>
};

export default Submit;