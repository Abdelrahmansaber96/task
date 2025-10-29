import { getUsersISR } from "@/app/utils";

export default async function UsersPage() {
  const users = await getUsersISR(
    "https://68ff56a5e02b16d1753d8116.mockapi.io/users/ahmed"
  );
console.log(users); 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
