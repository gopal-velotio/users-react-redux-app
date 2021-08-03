import styles from './Users.module.css';

export interface UserProps {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

const User: React.FC<UserProps> = ({
  id,
  picture,
  email,
  firstName,
  lastName
}) => {
  return (
    <div className={styles.user}>
      <img height='84' width='84' src={picture} alt={firstName} />
      <p>{`${firstName} ${lastName}`} </p>
      <p className={styles.email}>{email}</p>
    </div>
  );
};

export default User;
