import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../../api/hooks";
import {
  useAuthState,
  useUpdateDocumentMutation,
} from "../../../utils/firebase/hooks";
import { getPokemonId, transformStatName } from "../../../utils/helpers";
import { Button, Loader } from "../../UI";
import { PokemonTypes } from "..";

import styles from "./PokemonModal.module.css";

interface PokemonModalProps {
  id: Pokemon["id"];
  onCloseModal: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  id,
  onCloseModal,
}) => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetPokemonQuery({ option: id });
  const { data: user } = useAuthState();

  const addPokemon = useUpdateDocumentMutation({
    options: { onSuccess: () => onCloseModal() },
  });

  if (isLoading || !data || !user) {
    return <Loader />;
  }

  const { data: pokemon } = data;

  const openPageHandler = () => {
    onCloseModal();
    navigate(`pokemon/${id}`);
  };

  return (
    <>
      <div className={styles.modalTop}>
        <div>
          <p className={styles.title}>{transformStatName(pokemon.name)}</p>
          <p>{getPokemonId(String(pokemon.id))}</p>
        </div>
      </div>
      <img
        className={styles.image}
        src={pokemon.sprites.front_default ?? ""}
        alt={pokemon.name}
      />
      <PokemonTypes types={pokemon.types} />
      <div className={styles.modalBottom}>
        {user.pokemons.length < 6 && (
          <Button
            variant="primary"
            onClick={() =>
              addPokemon.mutate({
                collection: "users",
                data: {
                  pokemons: [
                    ...user.pokemons,
                    {
                      id: pokemon.id,
                      name: pokemon.name,
                      image: pokemon.sprites.front_default,
                    },
                  ],
                },
                id: user.uid,
              })
            }
          >
            Add to my team
          </Button>
        )}
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={openPageHandler}>
            Open
          </Button>
          <Button variant="primary" onClick={() => onCloseModal()}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
