import classes from './Registration.module.scss';
import { headingTypes } from '../../types/types';
import Heading from '../../components/typography/Heading';
import GameLogo from '../../components/other/GameLogo/GameLogo';
import { GAMETYPES } from '../../types/types';
import React, { useState } from 'react';
import Row from './components/Row/Row';
import Label from './components/Label/Label';
import TextInput from './components/TextInput/TextInput';
import DetailedInfo from './components/DetailedInfo/DetailedInfo';

//Game forms
import MinecraftForm from './GameForms/MinecraftForm';

const games = [
    GAMETYPES.MINECRAFT,
    GAMETYPES.COUNTER_STRIKE,
    GAMETYPES.LOL,
    GAMETYPES.ROCKET_LEAGUE
]

const Registration = () => {
    const [name, setName] = useState('');
    const [discordName, setDiscordName] = useState('');
    const [curGame, setGame] = useState(GAMETYPES.MINECRAFT);

    let gameSpecificPart = null;

    if (curGame === GAMETYPES.MINECRAFT) {
        gameSpecificPart = <MinecraftForm></MinecraftForm>;
    }

    return <div className={classes.Registration}>
        <Heading className={classes.Registration__heading} type={headingTypes.main}>Přihláška do turnaje</Heading>
        <form className={classes.Registration__form}>
            <Row>
                <Label className={classes.Registration__label} htmlFor="name">Zadejte, prosím, Vaše jméno</Label>
                <TextInput value={name} setFunction={setName} className={classes.Registration__textInput} id="name"></TextInput>
            </Row>
            <Row>
                <Label className={classes.Registration__label} htmlFor="dname">Zadejte, prosím, Vaše jméno na discordu</Label>
                <DetailedInfo>I s čtyřmístným číselným kódem #xxxx. (například: viotal#1256)</DetailedInfo>
                <TextInput value={discordName} setFunction={setDiscordName} className={classes.Registration__textInput} id="dname"></TextInput>
            </Row>
            <div className={classes.Registration__gameSelect}>
                <Label className={classes.Registration__label}>
                    Vyberte si jednu z her, na kterou se chcete přihlásit. Pokud se chcete přihlásit do více her, musíte vyplnit přihlášku dvakrát.
                    Není možné se přihlásit zároveň do League of Legends a Counter-Strike: Global Offensive, protože turnaje se budou prolínat.
                </Label>
                <div className={classes.Registration__gameSelect__games}>
                   {games.map((game) => {
                       let className = classes.Registration__gameSelect__game;
                       if (game === curGame) {
                           className += " " + classes.active;
                       }
                       return <GameLogo 
                       onClick={() => {
                           setGame(game);
                       }}
                       className={className} game={game}></GameLogo>
                   })}
                </div>
            </div>
            <div className={classes.Registration__gameSpecificPart}>
                {gameSpecificPart}
            </div>
            <div className={classes.Registration__final}>
                   <div className={classes.Registration__agreements}>

                   </div>
                   <button className={classes.Registration__submit}>
                        Odeslat přihlášku
                   </button>
            </div>
        </form>
    </div>
};

export default Registration;