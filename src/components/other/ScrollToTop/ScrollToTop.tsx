import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

const  ScrollToTop: React.FC<RouteComponentProps> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default withRouter(ScrollToTop);