import React, { useEffect } from 'react';
import Row from '../Row/Row';
import { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import Label from '../Label/Label';
import classes from './ContestantInput.module.scss';
import { GAMETYPES } from '../../../../types/types';
import { Contestant } from '../../../../types/types';
import { REGISTRATIONVARIANTS } from '../../../../types/types';
import { ROLES } from '../../../../types/types';
import AdultSelect from '../AdultSelect/AdultSelect';
import { CS_RANKS, FACEIT_LEVELS } from '../../../../constants/constants';
import SelectInput from '../SelectInput/SelectInput';
import SchoolSelect from '../SchoolSelect/SchoolSelect';

interface ContestantInputProps {
    game: GAMETYPES | null,
    variant: REGISTRATIONVARIANTS,
    setFunction?: Function,
    className?: string
}

const CSRankOptions = Object.keys(CS_RANKS).map((key) => {
    return {
        value: key,
        display: CS_RANKS[key]
    }
})

const FaceitLevelOptions = Object.keys(FACEIT_LEVELS).map(key => {
    return {
        value: key,
        display: FACEIT_LEVELS[key]
    }
})

const ContestantInput: React.FC<ContestantInputProps> = props => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [discord, setDiscord] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [adult, setIsAdult] = useState(false);
    const [epicId, setEpicId] = useState('')
    const [role, setRole] = useState(ROLES.MEMBER);
    const [isExternist, setIsExternist] = useState(false);

    let roleValue = '';
    if (role === ROLES.MEMBER) {
        roleValue = 'Hráč';
    } else if (role === ROLES.CAPTAIN) {
        roleValue = 'Kapitán'
    } else if (role === ROLES.RESERVIST) {
        roleValue = 'Záložník'
    }

    //CS:GO
    const [csRank, setCsRank] = useState('');
    const [maxCsRank, setMaxCsRank] = useState('');
    const [faceitLevel, setFaceitLevel] = useState('');
    const [maxFaceitLevel, setMaxFaceitLevel] = useState('');

    //ROCKET LEAGUE

    useEffect(() => {
        if (props.setFunction) {
            let contestant: Contestant = {
                name: name,
                surname: surname,
                discord: discord,
                email: email,
                nickname: nickname,
                adult: adult,
            }
            if (props.variant === REGISTRATIONVARIANTS.TEAM) {
                contestant.role = role;
                contestant.externist = isExternist;
            }
            if (props.game === GAMETYPES.COUNTER_STRIKE) {
                contestant.csRank = csRank;
                contestant.maxCsRank = maxCsRank;
                contestant.faceitLevel = faceitLevel;
                contestant.maxFaceitLevel = maxFaceitLevel;
            }
            if (props.game === GAMETYPES.ROCKET_LEAGUE) {
                contestant.epicId = epicId;
            }
            props.setFunction(contestant)
        }
    }, [name, surname, discord, email, nickname, props.game, csRank, maxCsRank, faceitLevel, maxFaceitLevel, adult, isExternist, role, epicId])

    return <div className={[classes.ContestantInput, props.className].join(' ')}>
        <Row>
            <Label obligatory>Jméno</Label>
            <TextInput value={name} setFunction={setName}></TextInput>
        </Row>
        <Row>
            <Label obligatory>Příjmení</Label>
            <TextInput value={surname} setFunction={setSurname}></TextInput>
        </Row>
        <Row>
            <Label obligatory>Discord jméno, id ve tvaru jmeno#1234</Label>
            <TextInput value={discord} setFunction={setDiscord}></TextInput>
        </Row>
        <Row>
            <Label obligatory>Email</Label>
            <TextInput value={email} setFunction={setEmail}></TextInput>
        </Row>
        <Row>
            <Label obligatory>Herní jméno</Label>
            <TextInput value={nickname} setFunction={setNickname}></TextInput>
        </Row>
        {props.variant === REGISTRATIONVARIANTS.TEAM && 
        <Row>
            <Label obligatory>Je z nepozvané školy?</Label>
            <SelectInput value={isExternist ? 'Ano' : 'Ne'} setFunction={setIsExternist} options={[{value: true, display: 'Ano'}, {value: false, display: 'Ne'}]}></SelectInput>
        </Row>}
        {props.variant === REGISTRATIONVARIANTS.TEAM && 
        <Row>
            <Label obligatory>Role v týmu</Label>
            <SelectInput value={roleValue} setFunction={setRole} options={[{value: ROLES.MEMBER, display: 'Hráč'}, {value: ROLES.CAPTAIN, display: 'Kapitán'}, {value: ROLES.RESERVIST, display: 'Záložník'}]}></SelectInput>
        </Row>}
        {props.game === GAMETYPES.COUNTER_STRIKE &&
            <Row>
                <Label obligatory>Současný rank</Label>
                <SelectInput value={CS_RANKS[csRank]} setFunction={setCsRank} options={CSRankOptions}></SelectInput>
            </Row>
        }
        {props.game === GAMETYPES.COUNTER_STRIKE &&
            <Row>
                <Label obligatory>Maximální dosažený rank</Label>
                <SelectInput value={CS_RANKS[maxCsRank]} setFunction={setMaxCsRank} options={CSRankOptions}></SelectInput>
            </Row>
        }
        {props.game === GAMETYPES.COUNTER_STRIKE &&
            <Row>
                <Label obligatory>Faceit level</Label>
                <SelectInput value={FACEIT_LEVELS[faceitLevel]} setFunction={setFaceitLevel} options={FaceitLevelOptions}></SelectInput>
            </Row>
        }
        {props.game === GAMETYPES.COUNTER_STRIKE &&
            <Row>
                <Label obligatory>Maximální dosažený Faceit level</Label>
                <SelectInput value={FACEIT_LEVELS[maxFaceitLevel]} setFunction={setMaxFaceitLevel} options={FaceitLevelOptions}></SelectInput>
            </Row>
        }
        {props.game === GAMETYPES.ROCKET_LEAGUE &&
            <Row>
                <Label obligatory>Epic ID</Label>
                <TextInput value={epicId} setFunction={setEpicId}></TextInput>
            </Row>
        }
        <AdultSelect value={adult} setFunction={(value: boolean) => {
           setIsAdult(value);
        }}></AdultSelect>
    </div>
};

export default ContestantInput;