import clsx from "clsx";
import { nanoid } from "nanoid";

import userDefault from "../../../assets/img/user_default.png";
import { auth } from "../../../utils/firebase/config";
import { useLogoutMutation } from "../../../utils/firebase/hooks";
import { PokemonTeam, PokemonTeamMember } from "../../pokemon";
import { Button } from "../../UI";

import styles from "./UserCard.module.css";

interface UserCardProps {
  user: UserDocument;
  className?: string;
}

export const UserCard = ({ user, className }: UserCardProps) => {
  const logout = useLogoutMutation();

  return (
    <div className={clsx(styles.card, className)} key={nanoid()}>
      <div className={styles.info}>
        <img
          className={styles.image}
          src={user.photoURL ?? userDefault}
          alt={user.displayName}
        />
        <p className={styles.name}>{user.displayName}</p>
        {user.uid === auth.currentUser?.uid && (
          <Button variant="secondary" onClick={() => logout.mutateAsync({})}>
            Logout
          </Button>
        )}
      </div>
      {user.pokemons.length > 0 && (
        <PokemonTeam>
          {user.pokemons.map((pokemon) => (
            <PokemonTeamMember name={pokemon.name} key={nanoid()} />
          ))}
        </PokemonTeam>
      )}
      {!user.pokemons.length && (
        <p className={styles.text}>This user has no team</p>
      )}
    </div>
  );
};
