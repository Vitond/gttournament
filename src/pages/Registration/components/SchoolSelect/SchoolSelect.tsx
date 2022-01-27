import { useContext, useState, useCallback } from "react";
import { Context } from "../../../../store/context";
import classes from './SchoolSelect.module.scss';
import Row from "../Row/Row";
import Label from "../Label/Label";
import TextInput from "../TextInput/TextInput";
import SelectInput from "../SelectInput/SelectInput";
import React from 'react';

interface SchoolSelectProps {
    id?: string,
    setFunction?: Function,
    className?: string,
    currentSchool: number | null,
    label?: string
}

const SchoolSelect: React.FC<SchoolSelectProps> = props => {
    const [curOption, setCurOption] = useState(-1);
    const [inputValue, setInputValue] = useState('');
  
    const context = useContext(Context);
    let schools: {value: number, display: string}[] = [];
   
    if (context.state.schools) {
        schools = context.state.schools.sort((prevSchool: string, thisSchool: string) => {
            if (prevSchool[0] > thisSchool[0]) {
                return 1;
            } else {
                return -1;
            }
        }).map((school: string[], id: number) => {
            return {
                value: school[0], 
                display: school[1]
            }
        })
        if (inputValue.length > 0 && curOption === -1) {
            const regexp = new RegExp(inputValue);
            schools = schools.filter((school) => {
                return school.display.match(regexp);
            });
        }
    }

    const textInputChange = useCallback((value: string) => {
        setCurOption(-1);
        if (props.setFunction) {
            props.setFunction(null);
        }
        setInputValue(value);
    }, [])
    const curOptionChange = useCallback((value) => {
        setInputValue(schools[value - 1].display);
        if (props.setFunction) {
            props.setFunction(value);
        };
        setCurOption(value);
    }, []);

    return <Row className={props.className}>
        <Label>{props.label}</Label>
        <div>
            <SelectInput options={schools} value={inputValue} textSetFunction={textInputChange} setFunction={curOptionChange}>

            </SelectInput>
        </div>
    </Row>

    
};

export default SchoolSelect;