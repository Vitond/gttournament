import classes from './Documents.module.scss';
import Heading from '../../components/typography/Heading';
import { headingTypes } from '../../types/types';
import documentIcon from '../../assets/document.png';
import { routeTransition, routeVariants } from '../../animations/animations';
import Section from '../../components/layout/Section/Section';
import { motion } from 'framer-motion';

const Documents = () => {
    const documentList = [/*{name: 'Zpracování osobních údajů', link: '/agreement.pdf'}*/{name: 'Souhlas rodičů s účastí na turnaji', link: '/parent_agreement.pdf'}]
    const documentElements = documentList.map((document) => {
        return <a href={document.link}><div className={classes.Documents__document}>
            <div>
                <img className={classes.Documents__image} src={documentIcon}></img>
            </div>
            <div className={classes.Documents__name}>
                {document.name}
            </div>
        </div></a>
    })
    return <motion.div className={classes.Documents} variants={routeVariants} transition={routeTransition} exit="hidden" animate="visible" initial="initial">
        <Section className={''}>
            <Heading className={classes.Documents__heading} type={headingTypes.main}>Dokumenty</Heading>
            <ul className={classes.Documents__list}>
                {documentElements}
            </ul>
        </Section>
    </motion.div>
};

export default Documents;