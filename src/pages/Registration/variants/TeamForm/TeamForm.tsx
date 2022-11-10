import Paragraph from "../../../../components/typography/Paragraph";
import SchoolSelect from "../../components/SchoolSelect/SchoolSelect";
import Contestants from "../../components/Contestants/Contestants";
import GameSelect from "../../components/GameSelect/GameSelect";
import contestantValidation, { nameValidation } from "../../validation/validation";
import { notEmptyValidation } from "../../validation/validation";
import { GAMETYPES, REGISTRATIONVARIANTS, ROLES } from "../../../../types/types";
import { useState, useCallback, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router";
import axios from '../../../../axios/axios';
import Agreement from "../../components/Agreement/Agreement";
import Submit from "../../components/Submit/Submit";
import classes from './TeamForm.module.scss';
import Label from "../../components/Label/Label";
import { Contestant } from "../../../../types/types";
import TextInput from "../../components/TextInput/TextInput";
import Row from "../../components/Row/Row";


const TeamForm: React.FC<RouteComponentProps> = (props) => {
    
    const [school, setSchool] = useState(null);
    const [game, setGame] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamNameWasSet, setTeamNameWasSet] = useState(false);

    const maxReservists = 2;

    let minContestantCount = 1;
    let defaultContestantCount = 0;
    let maxContestantCount = 0;

    if (game === GAMETYPES.MINECRAFT) {
        minContestantCount = 1;
        defaultContestantCount = 4;
        maxContestantCount = 4;
    } else if (game === GAMETYPES.COUNTER_STRIKE) {
        maxContestantCount = 5;
        defaultContestantCount = 5;
        minContestantCount = 5;
    } else if (game === GAMETYPES.LOL) {
        maxContestantCount = 5;
        defaultContestantCount = 5;
        minContestantCount = 5;
    } else if (game === GAMETYPES.ROCKET_LEAGUE) {
        defaultContestantCount = 2;
        maxContestantCount = 2;
        minContestantCount = 2;
    } else if (game === GAMETYPES.VALORANT) {
        defaultContestantCount = 5;
        maxContestantCount = 5;
        minContestantCount = 5;
    }

    const [contestantCount, setContestantCount] = useState(defaultContestantCount);
    const [contestants, setContestants] = useState<Contestant[]>([]);

    const addContestant = useCallback(() => {
        if (contestantCount + 1 > maxContestantCount + maxReservists) {
            return;
        }
        setContestantCount(c => c+1);
    }, [contestantCount, maxContestantCount, minContestantCount]);

    const removeContestant = useCallback(() => {
        if (contestantCount - 1 < minContestantCount) {
            return;
        }
        setContestantCount(c => c-1);
    }, [contestantCount, maxContestantCount, minContestantCount])


    const updateContestants = useCallback((i, contestant) => {
        let updatedContestants = [...contestants];
        updatedContestants[i] = contestant;
        setContestants(updatedContestants);
    }, [contestants])

    useEffect(() => {
        setContestantCount(defaultContestantCount);
    }, [game])


    const [agreed, setAgreed] = useState(false);
    const [invalidMessages, setInvalidMessages] = useState<string[]>([]);

    const onSubmit = useCallback(() => {
        const reducedContestants = contestants.filter((_, id) => {
            return id < contestantCount;
        })
        let data = {
            schoolId: school,
            game: game,
            name: teamName,
            contestants: reducedContestants
        }
        if (!nameValidation(teamName)) {
            setInvalidMessages(['Jméno týmu musí mít alespoň dva znaky.'])
            return;
        }
        if (!notEmptyValidation(game)) {
            setInvalidMessages(['Hra není zadaná.'])
            return;
        }
        if (!school) {
            setInvalidMessages(['Škola není zadaná nebo není použitá možnost z výběru.'])
            return;
        }
        if (game) {
            for (let i = 0; i < contestantCount; i++) {
                if (!contestants[i]) {
                    setInvalidMessages(['Účastník' + " " + (i + 1) + " " + "není vyplněný"]);
                    return;
                }
                let messages = contestantValidation(contestants[i], game, REGISTRATIONVARIANTS.TEAM);
                if (messages.length >= 1) {
                    messages = messages.map((message) => {
                        return "Člen" + " " + (i + 1) + ":" + " " + message; 
                    })
                    setInvalidMessages(messages);
                    return;
                }
            }
        }
        let captainCount = 0;
        let reservistCount = 0;
        let externistCount = 0;
        for (let i = 0; i < contestantCount; i++) {
            const contestant = contestants[i]
            if (contestant.role === ROLES.CAPTAIN) {
                  captainCount++;
            }  else if (contestant.role === ROLES.RESERVIST) {
                reservistCount++;
            }
            if (contestant.externist) {
                externistCount++;
            }
        }
       
        if (captainCount === 0) {
            setInvalidMessages(['Tým musí mít alespoň jednoho kapitána'])
            return;
        } else if (captainCount > 1) {
            setInvalidMessages(['Tým může mít maximálně jednoho kapitána'])
            return;
        }
        if (externistCount > 1) {
            setInvalidMessages(['Tým může mít maximálně jednoho člověka z jiné školy'])
            return;
        }
        if (reservistCount > maxReservists) {
            setInvalidMessages(['Maximální počet záložníků je 2'])
            return;
        }
        if (contestantCount == 1 && externistCount == 1) {
            setInvalidMessages(['Tým nemůže být složen pouze z jednoho externisty'])
            return;
        }
        const memberAndCaptainCount = contestantCount - reservistCount;
        if (memberAndCaptainCount > maxContestantCount) {
            setInvalidMessages([`Byl přesažen maximální dovolený počet aktivních hráčů (hráči + kapitán) pro tuto hru (${maxContestantCount})`])
            return;
        }
        if (memberAndCaptainCount < minContestantCount) {
            setInvalidMessages([`Nebyl dosažen minimální dovolený počet aktivních hráčů (hráči + kapitán) pro tuto hru (${minContestantCount})`])
            return;
        }
        if (!agreed) {
            setInvalidMessages(['Pro přihlášení je nutno souhlasit se všemi souhlasy']);
            return;
        }
        axios.post('/registration/team', data).then((response) => {
            props.history.push('/success')
        }).catch(err => {
            const text = err.response.data;
            console.log(text);
            if (text === "EXISTING_TEAM") {
                setInvalidMessages(['Tým s daným názvem už existuje'])
            } else if (text === "SAME_EMAIL") {
                setInvalidMessages(['Dva registrovaní účastníci nemůžou mít stejný mail'])
            } else if (text === "CONTESTANT_ALREADY_REGISTERED") {
                setInvalidMessages(['Minimálně jeden z účastníků je již pro tuto hru registrován.'])
            } else if (text === "Registrace je jiz uzavrena") {
                setInvalidMessages(['Registrace je již uzavřena'])
            } else {
                setInvalidMessages(['Došlo k chybě. Zkontroluj svoje připojení a pokud problém přetrvává, kontaktuj organizátory na turnajvpocitacovychhrach@gym-tisnov.cz'])
            }
        });
        
    }, [agreed, school, game, contestants, contestantCount, maxContestantCount, minContestantCount, teamName])

    const invalidMessageElements = invalidMessages.map((message) => {
        return <div className={classes.TeamForm__invalidMessage}>{message}</div>
    })

    return <div>
        <SchoolSelect label={'Škola, za kterou bude tým hrát (musí být položka ze seznamu)'} currentSchool={school} setFunction={setSchool} className={classes.AloneForm__schoolSelect}></SchoolSelect>
        <Row>
            <Label htmlFor="team-name">Jméno týmu</Label>
            <TextInput value={teamName} setFunction={(value: any) => {
                setTeamName(value)
                setTeamNameWasSet(true);
                }}></TextInput>
        </Row>
        <GameSelect label={'Hra'} currentGame={game} setFunction={setGame}></GameSelect>
        {teamNameWasSet && game && school && <Contestants updateContestants={updateContestants} addContestant={addContestant} removeContestant={removeContestant} count={contestantCount} setFunction={setContestants}game={game}></Contestants>}
        {teamNameWasSet && game && school && <Agreement setFunction={setAgreed} game={game}></Agreement>}
        <div className={classes.TeamForm__invalidMessages}>
            {invalidMessageElements}
        </div>
        {teamNameWasSet && game && school && <Submit className={classes.TeamForm__submit} onClick={(e: any) => {
            e.preventDefault();
            onSubmit();
        }}></Submit>}
    </div>
};

export default withRouter(TeamForm);
