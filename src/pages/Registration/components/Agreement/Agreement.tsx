import React, { useEffect } from 'react';
import { GAMETYPES } from '../../../../types/types';
import Label from '../Label/Label';
import { useState, useCallback } from 'react';
import Row from '../Row/Row';
import { GAMENAMES } from '../../../../constants/constants';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';
import classes from './Agreement.module.scss';

interface AgreementProps {
    game: GAMETYPES,
    setFunction: Function
}

const Agreement: React.FC<AgreementProps> = props => {
    const [generalAgreementChecked, setGeneralAgreementChecked] = useState(false);
    const [gameAgreementChecked, setGameAgreementChecked] = useState(false);
    const [GDPRAgreementChecked, setGDPRAgreementChecked] = useState(false);

    const toggleGDPR = useCallback(() => {
        setGDPRAgreementChecked(c => !c);
    }, []);
    const toggleGame = useCallback(() => {
        setGameAgreementChecked(c => !c);
    }, [])
    const toggleGeneral = useCallback(() => {
        setGeneralAgreementChecked(c => !c);
    }, [])

    useEffect(() => {
        props.setFunction(generalAgreementChecked && gameAgreementChecked);
    }, [generalAgreementChecked, gameAgreementChecked, GDPRAgreementChecked])
   
    return <div className={classes.Agreement}>
        {/* <Row className={classes.Agreement__row}>
            <Label className={classes.Agreement__label}>Souhlasím se <a download="agreement" href="/agreement.pdf">zpracováním osobních údajů.</a></Label>
            <CheckBoxInput setFunction={toggleGDPR} checked={GDPRAgreementChecked}></CheckBoxInput>
        </Row> */}
        <Row className={classes.Agreement__row}>
            <Label className={classes.Agreement__label}>Znám <a href="/rules/CS_GO.pdf" download="CS_GO">pravidla hry {GAMENAMES[props.game]}</a> a souhlasím s nimi.</Label>
            <CheckBoxInput setFunction={toggleGame} checked={gameAgreementChecked}></CheckBoxInput>
        </Row>
        <Row className={classes.Agreement__row}>
            <Label className={classes.Agreement__label}>Znám <a onClick={(e) => {
                e.preventDefault();
                window.open('/rules')
            }}href="/rules">obecná pravidla turnaje</a> a souhlasím s nimi.</Label>
            <CheckBoxInput setFunction={toggleGeneral} checked={generalAgreementChecked}></CheckBoxInput>
        </Row>
    </div>
};

export default Agreement;