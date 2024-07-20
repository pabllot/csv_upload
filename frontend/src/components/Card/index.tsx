export const Card = ({ user }: any) => {
  return (
    <div key={user.id} className="card">
      Name: <strong> {user.name}</strong>
      cidade: <strong> {user.city}</strong>
    </div>
  );
};
