import { useEffect, useState } from 'react';
import styles from './UserDetails.module.css';
import { RouteComponentProps, Link } from 'react-router-dom';
import {
  fetchUserDetailsAsync,
  selectUserDetails
} from 'features/users/usersSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';
import TabPanel from 'components/TabsPanel';

interface RouteParams {
  id: string;
}

const UserDetails: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const { id, title, firstName, lastName, email, picture } =
    useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();

  const userId = props.match.params.id;

  useEffect(() => {
    try {
      dispatch(fetchUserDetailsAsync(userId));
    } catch (err) {
      console.error(err);
    }
  }, [userId, dispatch]);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Container className={styles.details}>
            <img height='160' width='160' src={picture} alt={firstName} />
            <p className={styles.name}>
              {`${title}. ${firstName} ${lastName}`}{' '}
            </p>
            <p className={styles.email}>{email}</p>
            <p className={styles.id}>{`Id: ${id}`}</p>
            <Link to='/users'>Users </Link>
          </Container>
        </Grid>
        <Grid item xs>
          <Container className={styles.tabsContainer}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='simple tabs example'>
              <Tab label='Posts' {...a11yProps(0)} />
              <Tab label='Todos' {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <p>user posts and comments</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p>todos</p>
            </TabPanel>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default UserDetails;
