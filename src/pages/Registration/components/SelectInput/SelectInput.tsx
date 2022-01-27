import classes from './SelectInput.module.scss';
import TextInput from '../TextInput/TextInput';
import React, { useState, useCallback, useEffect } from 'react';

interface SelectInputProps {
    className?: string,
    setFunction?: Function,
    options: {value: any, display: string}[],
    id?: string,
    value?: any,
    textSetFunction?: Function
}

const SelectInput: React.FC<SelectInputProps> = props => {
    const [opened, setOpened] = useState(false);

    const toggleOpened = useCallback(() => {
        setOpened(true);
    }, [])
    const close = useCallback(() => {
        setOpened(false);
        document.removeEventListener('click', close);
    }, []);

    useEffect(() => {
        if (opened) {
            document.addEventListener('click', close);
        }
    }, [opened])

    const options = props.options.map((option, id) => {
        return <div key={id} onClick={() => {
            if (props.setFunction) {
                props.setFunction(option.value);
            }
        }}className={classes.SelectInput__option}>{option.display}</div>
    });

    return <div onClick={() => {
        toggleOpened();
    }}id={props.id} className={[classes.SelectInput, opened ? classes.opened : ''].join(' ')}>
        <TextInput setFunction={props.textSetFunction} value={props.value}></TextInput>
        <div className={[classes.SelectInput__options, opened ? classes.opened : ''].join(' ')}>
            {options}
        </div>
    </div>
};

export default SelectInput;