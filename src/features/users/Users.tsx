import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import User from 'features/users/User';
import { fetchUsersAsync, selectUsers } from 'features/users/usersSlice';
import styles from './Users.module.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { RouteComponentProps } from 'react-router-dom';

const Users: React.FC<RouteComponentProps> = (props) => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <Container>
      <p className={styles.header}>Users</p>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={2}>
          {users.map((user) => {
            return (
              <Grid
                key={user.id}
                onClick={() => props.history.push(`/user/${user.id}`)}
                item>
                <User {...user} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Users;
