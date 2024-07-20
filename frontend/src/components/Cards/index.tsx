import { Card } from "../Card";
import styles from "./styles.module.scss";

export const Cards = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {data?.map((user: any) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
