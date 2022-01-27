import React, { useEffect } from 'react';
import { GAMETYPES } from '../../../../types/types'
import { useState } from 'react';
import { Contestant } from '../../../../types/types';
import Label from '../Label/Label';
import { useCallback } from 'react';
import { REGISTRATIONVARIANTS } from '../../../../types/types';
import ContestantInput from '../UserInput/ContestantInput';
import classes from './Contestants.module.scss';
import Paragraph from '../../../../components/typography/Paragraph';

interface ContestantsProps {
    game: GAMETYPES,
    setFunction: Function,
    count: number,
    addContestant: Function,
    removeContestant: Function,
    updateContestants: Function
}

const Contestants: React.FC<ContestantsProps> = props => {

    let contestantInputs = [];

    for (let i = 0; i < props.count; i++) {
        contestantInputs.push(
            <div key={i} className={classes.Contestants__contestant}>
                <Label className={classes.Contestants__member}>Člen {i + 1}</Label>
                <ContestantInput setFunction={(contestant: Contestant) => {
                    props.updateContestants(i, contestant);
                }} className={classes.Contestants__contestantInput} game={props.game} variant={REGISTRATIONVARIANTS.TEAM}></ContestantInput>
            </div>
        )
    }

    return <div className={classes.Contestants}>
        <div className={classes.Contestants__controls}>
            <Paragraph className={classes.Contestants__controls__label}>Počet členů: </Paragraph>
            <Paragraph className={classes.Contestants__controls__value}>{props.count}</Paragraph>
            <div className={classes.Contestants__controls__buttons}>
                <div onClick={() => {
                    props.addContestant();
                }}className={classes.Contestants__controls__plus}>
                </div>
                <div onClick={() => {
                    props.removeContestant();
                }}className={classes.Contestants__controls__minus}>
                </div>
            </div>
        </div>
        {contestantInputs}
    </div>
};

export default Contestants;