import classes from './SchoolsSection.module.scss';
import { Context } from '../../../../store/context';
import Heading from '../../../../components/typography/Heading';
import { headingTypes } from '../../../../types/types';
import { useContext } from 'react';
import Section from '../../../../components/layout/Section/Section';

const SchoolsSection = () => {
    const context = useContext(Context);
    const schoolElements = context.state.schools.map((school: any) => {
        return <li className={classes.SchoolsSection__school}>{school[1]}</li>
    });
    return <Section className={classes.SchoolsSection}>
        <Heading className={classes.SchoolsSection__subheading} type={headingTypes.h2}>Pozvané školy</Heading>
        <ul className={classes.SchoolsSection__schools}>
            {schoolElements}
        </ul>
    </Section>
};

export default SchoolsSection;