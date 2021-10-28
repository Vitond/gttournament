import classes from './Home.module.scss';
import logo from '../../assets/logo.svg';

//Sections
import About from './sections/About/About';
import ThisYear from './sections/ThisYear/ThisYear';
import Header from './sections/Header/Header';


const Home = () => {
    return (
        <div className={classes.Home}>
            <Header></Header>
            <ThisYear></ThisYear>
            <About></About>
        </div>
    )
};

export default Home;