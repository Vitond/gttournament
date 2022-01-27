import classes from './Success.module.scss';
import { headingTypes } from '../../../types/types';
import Heading from '../../typography/Heading';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router';
import Paragraph from '../../typography/Paragraph';

const Success: React.FC<RouteComponentProps> = (props) => {
    return <div className={classes.Success}>
        <div onClick={() => {
            props.history.push('/');
        }}className={classes.Success__close}></div>
        <Heading className={classes.Success__heading} type={headingTypes.h1}>Přihláška se úspěšně odeslala!</Heading>
        <Heading type={headingTypes.h2} className={classes.Success__subheading}>Těšíme se na tebe na turnaji!</Heading>
    </div>
};

export default withRouter(Success);