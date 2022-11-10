import Paragraph from "../../../../components/typography/Paragraph";
import SchoolSelect from "../../components/SchoolSelect/SchoolSelect";
import GameSelect from "../../components/GameSelect/GameSelect";
import { useCallback, useState } from "react";
import Submit from "../../components/Submit/Submit";
import { withRouter } from "react-router";
import { notEmptyValidation, contestantValidation } from "../../validation/validation";
import classes from './AloneForm.module.scss';
import axios from '../../../../axios/axios';
import { RouteComponentProps } from "react-router";
import Agreement from "../../components/Agreement/Agreement";
import { Contestant, REGISTRATIONVARIANTS } from "../../../../types/types";
import ContestantInput from "../../components/UserInput/ContestantInput";
import { actionTypes } from "../../../../store/actionTypes";

const AloneForm: React.FC<RouteComponentProps> = props => {
    const [game, setGame] = useState(null);
    const [school, setSchool] = useState(null);
    const [contestant, setContestant] = useState<Contestant>({name: '', surname: '', email: '', discord: '', nickname: '', adult: false});
    const [invalidMessages, setInvalidMessages] = useState<string[]>([]);
    const [agreed, setAgreed] = useState(false);

    const onSubmit = useCallback((e) => {
        
        let data = {
            schoolId: school,
            game: game,
            contestant: contestant
        }
        data.contestant.schoolId = school;
        e.preventDefault();
        if (!notEmptyValidation(game)) {
            setInvalidMessages(['Hra není zadaná.'])
            return;
        }
        if (!school) {
            setInvalidMessages(['Škola není zadaná nebo není použitá možnost z výběru.'])
            return;
        }
        if (game) {
            const messages = contestantValidation(contestant, game, REGISTRATIONVARIANTS.ALONE)
            if (messages.length >= 1) {
                setInvalidMessages(messages)
                return;
            }
        }
        if (!agreed) {
            setInvalidMessages(['Pro přihlášení je nutno souhlasit se všemi souhlasy']);
            return;
        }
        axios.post('/registration/alone', data).then(() => {
            props.history.push('/success');
        }).catch(err => {
            console.log(err.response.data)
            if (err.response.data === "Registrace je jiz uzavrena") {
                setInvalidMessages(['Registrace je již uzavřena'])
            }else {
                setInvalidMessages(['Došlo k chybě. Zkontroluj svoje připojení a pokud problém přetrvává, kontaktuj organizátory na turnajvpocitacovychhrach@gym-tisnov.cz'])
            }
        });
       
    }, [contestant, game, school, agreed]);

    return <div className={classes.AloneForm}>
        <Paragraph className={[classes.AloneForm__paragraph, classes.AloneForm__paragraph_1].join(' ')}>Ještě neztrácej naději!</Paragraph>
        <Paragraph className={[classes.AloneForm__paragraph].join(' ')}>Pokud vyplníš přihlášku níže, existuje šance, že ti organizátoři pomůžout sestavit tým.</Paragraph>
        <Paragraph className={[classes.AloneForm__paragraph].join(' ')}>Jestli se chceš nejdříve pokusit o nalezení týmu na vlastní pěst, máme na to vyhrazený kanál #hledání-týmů na discordu turnaje.</Paragraph>
        <SchoolSelect label={'Tvoje škola'} currentSchool={school} setFunction={setSchool} className={classes.AloneForm__schoolSelect}></SchoolSelect>
        <GameSelect label={'Hra'} currentGame={game} setFunction={setGame}></GameSelect>
        {game && school && <ContestantInput setFunction={setContestant} variant={REGISTRATIONVARIANTS.ALONE} game={game}></ContestantInput>}
        {game && school && <Agreement setFunction={setAgreed} game={game}></Agreement>}
        {invalidMessages.length >= 1 && 
            <div className={classes.AloneForm__invalidMessages}>
                {invalidMessages.map((message, id) => {
                    return <div key={id} className={classes.AloneForm__invalidMessage}>
                        {message}
                    </div>
                })}
            </div>}
        {game && school && <Submit onClick={(e: any) => {
            onSubmit(e);
        }}className={classes.AloneForm__submit}></Submit>}
    </div>
};

export default withRouter(AloneForm);
