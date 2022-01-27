import classes from './Contestants.module.scss';
import Heading from '../../components/typography/Heading';
import { routeTransition, routeVariants } from '../../animations/animations';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section/Section';
import SchoolsSection from './sections/schools/SchoolsSection';
import ContestantsSection from './sections/contestants/ContestantsSection';
import { headingTypes } from '../../types/types';

const Contestants = () => {
   
    return <motion.div variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial" className={classes.Contestants}>
        <Section className={''}>
            <Heading type={headingTypes.main} className={classes.Contestants__heading}>Účastníci</Heading>
        </Section>
        <SchoolsSection></SchoolsSection>
        <ContestantsSection></ContestantsSection>
    </motion.div>
};

export default Contestants;