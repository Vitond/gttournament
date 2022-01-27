import React, { useCallback, useState } from 'react';
import { GAMETYPES } from '../../../../types/types';
import { GAMENAMES } from '../../../../constants/constants';
import SelectInput from '../SelectInput/SelectInput';
import Row from '../Row/Row';
import Label from '../Label/Label';
import classes from './GameSelect.module.scss';

interface GameSelectProps {
    className?: string,
    setFunction: Function,
    currentGame: GAMETYPES | null,
    label?: string
}

const GameSelect: React.FC<GameSelectProps> = props => {
    const [text, setText] = useState('');
    const options = Object.keys(GAMETYPES).map((gameType, id) => {
        return {
            display: GAMENAMES[gameType],
            value: id,
            gameType: gameType
        }
    })
    const textSetFunction = useCallback((text) => {
        
    }, []);
    const optionChange = useCallback((option) => {
        setText(options[option].display);
        props.setFunction(options[option].gameType);
    }, []);

    return <Row className={classes.GameSelect}>
        <Label>{props.label}</Label>
        <SelectInput textSetFunction={textSetFunction} value={text} options={options} setFunction={optionChange}>
        </SelectInput>
    </Row>
};

export default GameSelect;