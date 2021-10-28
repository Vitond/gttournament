import classes from './TextInput.module.scss';
import React from 'react';

interface TextInputProps {
    className?: string,
    setFunction?: Function,
    value?: string
    id?: string
}

const TextInput: React.FC<TextInputProps> = props => {
    return <input type="text" value={props.value} id={props.id} onChange={(e) => {
        if (props.setFunction) {
            props.setFunction(e.target.value);
        }
    }}className={classes.TextInput}>
        {props.children}
    </input>
};

export default TextInput;