import { nanoid } from "nanoid";

import { Loader, PageLayout, UserCard } from "../../components";
import { useUsersCollection } from "../../utils/firebase/hooks";

import styles from "./UsersPage.module.css";

const UsersPage = () => {
  const { data: users, isLoading } = useUsersCollection();

  if (isLoading || !users) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles.users}>
        {users.map((user) => (
          <UserCard user={user} key={nanoid()} />
        ))}
      </div>
    </PageLayout>
  );
};

export default UsersPage;
