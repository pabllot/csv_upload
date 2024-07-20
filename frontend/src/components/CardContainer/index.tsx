export const Cards = ({ data }: any) => {
  return (
    <>
      <div>
        {data?.map((user: any) => (
          <div key={user.id} className="card">
            Name: <strong> {user.name}</strong>
            cidade: <strong> {user.city}</strong>
          </div>
        ))}
      </div>
    </>
  );
};
