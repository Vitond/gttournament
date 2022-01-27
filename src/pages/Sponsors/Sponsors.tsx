import classes from './Sponsors.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import CZCLogo from "../../assets/CZC_logo.png";
import { routeTransition, routeVariants } from "../../animations/animations";
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

const Sponsors = () => {
    return <motion.div className={classes.Sponsors} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={''} type={headingTypes.main}>Sponzoři</Heading>
            <div className={classes.Sponsors__sponsor}>
                <img className={classes.Sponsors__sponsor__logo} src={CZCLogo}></img>
            </div>
        </Section>
    </motion.div>
};

export default Sponsors;