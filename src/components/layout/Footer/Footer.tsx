import discordLogo from '../../../assets/discord-logo.svg';
import twitchLogo from '../../../assets/twitch-logo.svg';
import logo from '../../../assets/logo.svg';
import classes from './Footer.module.scss';
import mailIcon from '../../../assets/mail-icon.svg';

const Footer = () => {
    return <div className={classes.Footer}>
        <div className={[classes.Footer__section, classes.Footer__section_left].join(' ')}>
            <img className={classes.Footer__logo} src={logo}></img>
        </div>
        <div className={[classes.Footer__section, classes.Footer__section_right].join(' ')}>
            <div className={classes.Footer__mail}>
                <img src={mailIcon}></img>
                <p><a href="mailto:turnajvpocitacovychhrach@gym-tisnov.cz">turnajvpocitacovychhrach@gym-tisnov.cz</a></p>
            </div>
            <div className={classes.Footer__twitch}>
                <img className={classes.Footer__twitchLogo} src={twitchLogo}></img>
                <div className={classes.Footer__twitchLinks}>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_a">https://www.twitch.tv/gttournament_a</a></p>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_b">https://www.twitch.tv/gttournament_b</a></p>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_c">https://www.twitch.tv/gttournament_c</a></p>
                    <p className={classes.Footer__twitchLink}><a href="https://www.twitch.tv/gttournament_d">https://www.twitch.tv/gttournament_d</a></p>
                </div>
            </div>
            <div className={classes.Footer__discord}>
                <img className={classes.Footer__discordLogo} src={discordLogo}></img>
                <p className={classes.Footer__discordLink}>
                    <a href="https://discord.gg/WXtGFxrAdR">https://discord.gg/WXtGFxrAdR</a>
                </p>
            </div>
            
        </div>
       
    </div>
};

export default Footer;