import { User } from "../../types";
import styles from "./styles.module.scss";

export const Card = ({ user }: { user: User }) => {
  return (
    <div data-testid="info-card" key={user.id} className={styles.wrapper}>
      <p data-testid="user-name">
        Name <strong> {user.name}</strong>
      </p>
      <p data-testid="user-city">
        City<strong> {user.city}</strong>
      </p>
      <p data-testid="user-country">
        country <strong> {user.country}</strong>
      </p>
      <p data-testid="user-sport">
        favorite sport <strong> {user.favorite_sport}</strong>
      </p>
    </div>
  );
};
