import classes from './SelectInput.module.scss';
import React, { useState, useCallback } from 'react';

interface SelectInputProps {
    className?: string,
    setFunction?: Function,
    options: {value: string, display: string}[],
    id?: string
}

const SelectInput: React.FC<SelectInputProps> = props => {
    const [curOption, setCurOption] = useState(0);
    const [opened, setOpened] = useState(false);

    const toggleOpened = useCallback(() => {
        setOpened((prevOpened) => !prevOpened);
    }, [])

    const options = props.options.map((option, id) => {
        return <div onClick={() => {
            setCurOption(id);
            if (props.setFunction) {
                props.setFunction(option.value);
            }
        }}className={classes.SelectInput__option}>{option.display}</div>
    });
    return <div onClick={() => {
        toggleOpened();
    }}id={props.id} className={[classes.SelectInput, opened ? classes.opened : ''].join(' ')}>
        <div className={classes.SelectInput__value}>
            {options[curOption]}
        </div>
        <div className={[classes.SelectInput__options, opened ? classes.opened : ''].join(' ')}>
            {options}
        </div>
    </div>
};

export default SelectInput;