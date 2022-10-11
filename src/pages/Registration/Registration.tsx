import classes from './Registration.module.scss';
import { headingTypes } from '../../types/types';
import Heading from '../../components/typography/Heading';
import { GAMETYPES, REGISTRATIONVARIANTS } from '../../types/types';
import React, { useState} from 'react';
import { motion } from 'framer-motion';
import { routeVariants, routeTransition } from '../../animations/animations';


//Variants
import TeamForm from './variants/TeamForm/TeamForm';
import AloneForm from './variants/AloneForm/AloneForm';
import VariantSelect from './components/VariantSelect/VariantSelect';
import Paragraph from '../../components/typography/Paragraph';

const games = [
    GAMETYPES.MINECRAFT,
    GAMETYPES.COUNTER_STRIKE,
    GAMETYPES.LOL,
    GAMETYPES.ROCKET_LEAGUE
]

const Registration = () => {
    const [registrationVariant, setRegistrationVariant] = useState<(REGISTRATIONVARIANTS | null)>(null);

    let variant = null;
    if (registrationVariant === REGISTRATIONVARIANTS.TEAM) {
        variant = <TeamForm></TeamForm>;
    } else if (registrationVariant === REGISTRATIONVARIANTS.ALONE) {
        variant = <AloneForm></AloneForm>;
    }

    return <motion.div transition={routeTransition} key="registration" variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Registration}>
        <Heading className={classes.Registration__heading} type={headingTypes.main}>Přihláška do turnaje</Heading>
        <Heading type={headingTypes.h2} className={classes.Registration__subheading}>Důležité informace:</Heading>
        <ul className={classes.Registration__importantList}>
            <li><Paragraph className={classes.Registration__important}>
               Turnaje se můžou účastnit především studenti a učitelé pozvaných škol. Pro každý tým je však povolen jeden externista - účastník, který je ze školy, která není na seznamu pozvaných škol. Pokud není Vaše škola na seznamu, napište nám, můžeme ji kontaktovat!
            </Paragraph></li>
            <li> <Paragraph className={classes.Registration__important}>
            Všichni účastníci, kteří během turnaje nebudou plnoletí, musí odevzdat <a href="/parent_agreement.pdf" download="parent_agreement">souhlas rodičů s účastí v turnaji</a> na turnajvpocitacovychhrach@gym-tisnov.cz
            </Paragraph></li>
            <li><Paragraph className={classes.Registration__important}>
                Přihlášky můžete podávat do 14.11.2022
            </Paragraph></li>
            {/* <li><Paragraph className={classes.Registration__important}>
                Registrace byla ukončena.
            </Paragraph></li> */}
        </ul>
        <VariantSelect className={classes.Registration__variantSelect} currentVariant={registrationVariant} setFunction={setRegistrationVariant}></VariantSelect>
        <form className={classes.Registration__form}>
            {variant}
        </form>
    </motion.div>
};

export default Registration;