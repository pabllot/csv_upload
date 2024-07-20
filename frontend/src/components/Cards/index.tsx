import { User } from "../../types";
import { Card } from "../Card";
import styles from "./styles.module.scss";

export const Cards = ({ data }: { data: User[] | [] }) => {
  return (
    <div data-testid="cards-container" className={styles.container}>
      <div className={styles.wrapper}>{data?.length === 0 ? <p>No users found.</p> : data?.map((user: User) => <Card key={user.id} user={user} />)}</div>
    </div>
  );
};
