import { useAppDispatch, useAppSelector } from 'app/hooks';
import User from 'features/users/User';
import { fetchUsersAsync, selectUsers } from 'features/users/usersSlice';
import React, { useEffect } from 'react';
import styles from './Users.module.css';

const Users = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch])

  return (
    <div>
      <p className={styles.header}>Users Page</p>
      {users.map( (user) => {
          return <User key={user.id} {...user} />
      })}
    </div>
  );
};

export default Users;
