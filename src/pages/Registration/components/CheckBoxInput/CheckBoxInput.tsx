import React from 'react';
import classes from './CheckBoxInput.module.scss';

interface CheckBoxInputProps {
    checked: boolean,
    setFunction: Function
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = props => {
    
    return <label className={classes.CheckBoxInput}>
        <input onChange={(e) => {
            props.setFunction();
        }}type="checkbox" className={classes.CheckBoxInput__realInput} >
        </input>
        <div className={[classes.CheckBoxInput__customCheckBox, props.checked ? classes.checked : ''].join(' ')}>
            <div className={[classes.CheckBoxInput__checkmark, props.checked ? classes.checked : ''].join(' ')}>

            </div>
        </div>
    </label>
};

export default CheckBoxInput;