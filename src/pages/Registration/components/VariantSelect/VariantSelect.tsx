import classes from './VariantSelect.module.scss';
import { REGISTRATIONVARIANTS } from '../../../../types/types';
import React from 'react';

interface VariantSelectProps {
    setFunction: Function,
    currentVariant: REGISTRATIONVARIANTS | null,
    className?: string
}

const VariantSelect: React.FC<VariantSelectProps> = props => {
    return   <div className={classes.VariantSelect}>
        <div 
            onClick={() => {
            props.setFunction(REGISTRATIONVARIANTS.TEAM);
            }}
            className={[classes.VariantSelect__variant, props.className, props.currentVariant === REGISTRATIONVARIANTS.TEAM ? classes.active : ''].join(' ')}
        >Chci přihlásit tým do turnaje</div>
        <div 
            onClick={() => {
            props.setFunction(REGISTRATIONVARIANTS.ALONE)
            }}
            className={[classes.VariantSelect__variant, props.className, props.currentVariant === REGISTRATIONVARIANTS.ALONE ? classes.active : ''].join(' ')}
        >Chci se zúčastnit, ale nemám tým</div>
    </div>
};

export default VariantSelect;