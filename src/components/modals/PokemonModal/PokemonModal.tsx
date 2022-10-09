import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../../api/hooks";
import {
  useAuthState,
  useUpdateDocumentMutation,
} from "../../../utils/firebase/hooks";
import { getPokemonId, transformStatName } from "../../../utils/helpers";
import { PokemonTypes } from "../../pokemon";
import { Button } from "../../UI/Button/Button";

import { Backdrop } from "./Backdrop";

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
    return null;
  }

  const { data: pokemon } = data;

  const openPageHandler = () => {
    onCloseModal();
    navigate(`pokemon/${id}`);
  };

  return (
    <>
      <Backdrop onClick={() => onCloseModal()} />
      <div className={styles.pokemonModal}>
        <div className={styles.modalTop}>
          <div>
            <p className={styles.title}>{transformStatName(pokemon.name)}</p>
            <p>{getPokemonId(String(pokemon.id))}</p>
          </div>
        </div>

        <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />

        <PokemonTypes types={pokemon.types} />

        {user.pokemons.length < 6 && (
          <Button
            variant="red"
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
        <div>
          <Button variant="blue" onClick={openPageHandler}>
            Open
          </Button>
          <Button variant="outlinedBlue" onClick={() => onCloseModal()}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
