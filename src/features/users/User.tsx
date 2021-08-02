
import styles from './Users.module.css';

export interface UserProps {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  picture: string;
  title: string;
}

const User: React.FC<UserProps> = (props) => {
  return (
    <div className={styles.user}>
      <img src={props.picture} alt={props.firstName} />
      <p>{props.firstName + ' ' + props.lastName} </p>
    </div>
  );
};

export default User;
