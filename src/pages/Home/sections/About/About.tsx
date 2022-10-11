import classes from './About.module.scss';
import Section from '../../../../components/layout/Section/Section';
import Heading from '../../../../components/typography/Heading';
import Paragraph from '../../../../components/typography/Paragraph';
import { GAMETYPES, headingTypes } from '../../../../types/types';
import { GAMENAMES } from '../../../../constants/constants';
import { useState, Fragment } from 'react';

const About = () => {
    const [currentGame, setCurrentGame] = useState(GAMENAMES[GAMETYPES.MINECRAFT]);

    const gameHeadings = Object.keys(GAMETYPES).map((gameType) => {
        let className = classes.About__subHeading;
        if (GAMENAMES[gameType] === currentGame) {
            className += " " + classes.active;
        }
        return <Heading key={gameType} onClick={
            () => {
                setCurrentGame(GAMENAMES[gameType]);
            }
        }className={className} type={headingTypes.h3}>{GAMENAMES[gameType]}</Heading>
    });

    const gameSelect = <div className={classes.About__gameSelect}>
        {gameHeadings}
    </div>

    const counterStrikeGameDescription = <div>
        <Paragraph className={classes.About__paragraph}>
            Counter-Strike: Global Offensive je u nás zatím nejoblíbenější hrou.
        </Paragraph>
        <Paragraph className={classes.About__paragraph}>
            Turnaje
        </Paragraph>
    </div>
    const minecraftGameDescription = <div>
        <Paragraph className={classes.About__paragraph}>
            Začalo to jako experiment, o kterém jsme nevěděli, jestli se uchytí. Po inspiraci youtuberem Dreamem nás napadlo 
            přetvořit koncept speedrunu v týmovou soutěž. V předchozích turnajích se tak mohly přihlásit až tříčlenné týmy, které potom na mapě, jež předem neznali, soutežili
            o co největší možný počet dosažených bodů. Největší počet bodů byl za zabití Ender Dragona, jeho zabití zároveň ukončilo hru.
        </Paragraph>
        <Paragraph className={classes.About__paragraph}>
            Tento ročník je na řadě další experiment - bedwars.
        </Paragraph>
    </div>
    const lolGameDescription = <div>

    </div>
    const rocketLeagueDescription = <div>

    </div>

    let gameDescription = <div></div>;
    if (currentGame === GAMENAMES[GAMETYPES.COUNTER_STRIKE]) {
        gameDescription = counterStrikeGameDescription;
    } else if (currentGame === GAMENAMES[GAMETYPES.MINECRAFT]) {
        gameDescription = minecraftGameDescription;
    } else if (currentGame === GAMENAMES[GAMETYPES.LOL]) {
        gameDescription = lolGameDescription;
    } else if (currentGame === GAMENAMES[GAMETYPES.ROCKET_LEAGUE]) {
        gameDescription = rocketLeagueDescription;
    }

    return <Section className={classes.About}>
       
        <Heading type={headingTypes.h1} className={classes.About__heading}>O turnaji</Heading>
        <Paragraph className={classes.About__paragraph}>
        GT Tournament je turnaj v počítačových hrách, který je už již tradičně pořádaný především ku příležitosti Mezinárodního dne studentstva studentským parlamentem Gymnázia v Tišnově. Snažíme se poskytnout studentům prostor setkat se i mimo lavice.
        </Paragraph>
        <Paragraph className={classes.About__paragraph}>
        Přidáš se letos i ty?
        </Paragraph>
        <Paragraph className={classes.About__paragraph}>
           Kromě organizace turnajů komentujeme turnaje živě na platformě Twitch. Odkaz na twitch naleznete vždy v rozpisu dní nahoře, vedle příslušného eventu.
        </Paragraph>
        {/* <Heading className={classes.About__subheading} type={headingTypes.h2}>Hry</Heading>
        {gameSelect}
        {gameDescription} */}
      
    </Section>;
};

export default About;