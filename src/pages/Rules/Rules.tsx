import classes from './Rules.module.scss';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import { routeTransition, routeVariants } from '../../animations/animations';
import GeneralRules from './sections/GeneralRules/GeneralRules';

const Rules = () => {
    return <motion.div key="rules" initial="initial" exit="hidden" animate="visible" transition={routeTransition} variants={routeVariants} className={classes.Rules}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Rules__heading}>Pravidla</Heading>
        </Section>
        <GeneralRules></GeneralRules>
    </motion.div>
};

export default Rules;