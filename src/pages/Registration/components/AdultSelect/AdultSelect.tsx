import CheckBoxInput from "../CheckBoxInput/CheckBoxInput";
import Row from "../Row/Row";
import Label from "../Label/Label";
import React from 'react';
import SelectInput from "../SelectInput/SelectInput";

interface AdultSelectProps {
    setFunction: Function,
    value: boolean
}

const options = [{value: true, display: 'Ano'}, {value: false, display: 'Ne'}]

const AdultSelect: React.FC<AdultSelectProps> = props => {
    let value = 'Ano';
    if (!props.value) {
        value = 'Ne';
    }
    return <Row>
        <Label>Bude dospělý v době turnaje</Label>
        <SelectInput value={value} setFunction={props.setFunction} options={options}></SelectInput>
    </Row>
};

export default AdultSelect;