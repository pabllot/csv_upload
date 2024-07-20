import { Card } from "../Card";

export const Cards = ({ data }: any) => {
  return (
    <>
      <div>
        {data?.map((user: any) => (
          <Card user={user} />
        ))}
      </div>
    </>
  );
};
