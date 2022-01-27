import classes from './ContestantsSection.module.scss';
import Section from '../../../../components/layout/Section/Section';
import Heading from '../../../../components/typography/Heading';
import { headingTypes } from '../../../../types/types';
import { useEffect, useState } from 'react';
import axios from '../../../../axios/axios';
import { GAMENAMES } from '../../../../constants/constants';

const ContestantsSection = () => {
  
    const [teams, setTeams] = useState<{team: any[], members: any[]}[]>([]);
    useEffect(() => {
        axios.get('/contestants').then(response => {
            setTeams(response.data.teams)
        })
    }, []);
    const gameElements = Object.keys(GAMENAMES).map((key) => {
        const gameTeams = teams.filter((team) => {
            return team.team[2] === key;
        })
        const teamElements = gameTeams.map((team) => {
            const teamMemberElements = team.members.map((member) => {
                return <div className={classes.ContestantsSection__team__member}>
                    <p className={classes.ContestantsSection__team__member__name}>
                        {member[0]}
                    </p>
                    <p className={classes.ContestantsSection__team__member__role}>
                        {member[1] === 'CAPTAIN' ? 'Kapitán' : member[1] === 'MEMBER' ? 'Hráč' : 'Záložník'}
                    </p>
                </div>
            });
            return <div className={classes.ContestantsSection__team}>
                <p className={classes.ContestantsSection__team__name}>{team.team[1]}</p>
                <div className={classes.ContestantsSection__team__members}>
                    {teamMemberElements}
                </div>
            </div>
        })
        return <div className={classes.ContestantsSection__game}>
            <Heading className={classes.ContestantsSection__gameheading} type={headingTypes.h3}>{GAMENAMES[key]}</Heading>
            <div className={classes.ContestantsSection__game__teams}>
                {teamElements}
            </div>
        </div>
    })
    
    return <Section className={classes.ContestantsSection}>
        <Heading className={classes.ContestantsSection__subheading} type={headingTypes.h2}>Účastníci turnaje</Heading>
        {gameElements}
    </Section>
};

export default ContestantsSection;