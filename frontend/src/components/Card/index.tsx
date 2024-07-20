import { User } from "../../types";
import styles from "./styles.module.scss";

export const Card = ({ user }: { user: User }) => {
  return (
    <div key={user.id} className={styles.wrapper}>
      <p>Name</p> <strong> {user.name}</strong>
      <p>City</p> <strong> {user.city}</strong>
      <p>country</p> <strong> {user.country}</strong>
      <p>favorite_sport</p> <strong> {user.favorite_sport}</strong>
    </div>
  );
};
