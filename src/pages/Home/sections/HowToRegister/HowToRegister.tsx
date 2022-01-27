import Section from '../../../../components/layout/Section/Section';
import Heading from '../../../../components/typography/Heading';
import CTA from '../../../../components/layout/CTA/CTA';
import { withRouter } from 'react-router';
import { headingTypes } from '../../../../types/types';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import Paragraph from '../../../../components/typography/Paragraph';
import classes from './HowToRegister.module.scss';

const HowToRegister: React.FC<RouteComponentProps> = (props) => {
    return <Section className={classes.HowToRegister}>
        <Heading className={classes.HowToRegister__heading} type={headingTypes.h1}>Jak se přihlásit?</Heading>
        <Paragraph className={classes.HowToRegister__paragraph}>
            Abyste se mohli přihlásit, musí být Vaše škola na seznamu pozvaných škol. Na seznam pozvaných škol se můžete podívat <span className={classes.HowToRegister__link}><NavLink to="/contestants">zde</NavLink></span>.
        </Paragraph>
        <Paragraph className={[classes.HowToRegister__paragraph, classes.HowToRegister__paragraph_detail].join(' ')}>
           Pokud Vaše škola není na seznamu pozvaných škol, neváhejte nám napsat na <span className={classes.HowToRegister__link}><a href="mailto:turnajvpocitacovychhrach@gym-tisnov.cz">turnajvpocitacovychhrach@gym-tisnov.cz</a></span>.
           Třeba ji ještě stihneme pozvat!
        </Paragraph>
        <Paragraph className={classes.HowToRegister__paragraph}>
           Pak už stačí jenom přečíst <span className={classes.HowToRegister__link}><NavLink to="/rules">pravidla</NavLink></span> (jsou důležitá), kliknout na tlačítko níže a vyplnit registraci! 
        </Paragraph>
        <CTA onClick={() => {
            props.history.push('/registration')
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }}className={classes.HowToRegister__cta}>
            Registrace
        </CTA>    
    </Section>
};

export default withRouter(HowToRegister);