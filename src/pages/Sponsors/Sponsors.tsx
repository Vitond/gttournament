import classes from './Sponsors.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from "../../animations/animations";
import Section from '../../components/layout/Section/Section';
import SponsorshipPackages from '../../assets/sponzorske-balicky.png';
import { motion } from 'framer-motion';

const Sponsors = () => {
    return <motion.div key="sponsors" className={classes.Sponsors} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={''} type={headingTypes.main}>Sponzoři</Heading>
            <img className={classes.Sponsors__packages} src={SponsorshipPackages}></img>
            <p className={classes.Sponsors__contact}>Pokud máte zájem stát se sponzorem, kontaktujte nás na <b><a href="mailtoturnajvpocitacovychhrach@gym-tisnov.cz">turnajvpocitacovychhrach@gym-tisnov.cz</a></b>.</p>
        </Section>
    </motion.div>
};

export default Sponsors;