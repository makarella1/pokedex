import { Loader, PageLayout, UserCard } from "../../components";
import { useUsersCollection } from "../../utils/firebase/hooks";

export const UsersPage = () => {
  const { data: users, isLoading } = useUsersCollection();

  if (isLoading || !users) {
    return <Loader />;
  }

  return (
    <PageLayout>
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </PageLayout>
  );
};
