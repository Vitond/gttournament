import classes from './TextInput.module.scss';
import React from 'react';

interface TextInputProps {
    className?: string,
    setFunction?: Function,
    value?: string
    id?: string,
    onBlur?: Function
}

const TextInput: React.FC<TextInputProps> = props => {
    return <input onBlur={() => {
        if (props.onBlur) {
            props.onBlur();
        }
    }} spellCheck="false" type="text" value={props.value} id={props.id} onChange={(e) => {
        if (props.setFunction) {
            props.setFunction(e.target.value);
        }
    }}className={[classes.TextInput, props.className].join(' ')}>
        {props.children}
    </input>
};

export default TextInput;