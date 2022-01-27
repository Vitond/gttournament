import classes from './Home.module.scss';
import { routeVariants, routeTransition } from '../../animations/animations';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';

//Sections
import About from './sections/About/About';
import HowToRegister from './sections/HowToRegister/HowToRegister';
import ThisYear from './sections/ThisYear/ThisYear';
import Header from './sections/Header/Header';


const Home = () => {
    return (
        <motion.div key="home" transition={routeTransition} variants={routeVariants} initial="initial" animate="visible" exit="hidden" className={classes.Home}>
            <Header></Header>
            <ThisYear></ThisYear>
            <HowToRegister></HowToRegister>
            <About></About>
        </motion.div>
    )
};

export default Home;