import styles from "./styles.module.scss";

export const Card = ({ user }: any) => {
  return (
    <div key={user.id} className={styles.wrapper}>
      <p>Name:</p> <strong> {user.name}</strong>
      <p>City:</p> <strong> {user.city}</strong>
      <p>country:</p> <strong> {user.country}</strong>
      <p>favourite_sport:</p> <strong> {user.favourite_sport}</strong>
    </div>
  );
};
