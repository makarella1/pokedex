import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useGetPokemonQuery } from "../../api/hooks";
import {
  useAuthState,
  useUpdateDocumentMutation,
} from "../../utils/firebase/hooks";
import { getPokemonId, transformStatName } from "../../utils/helpers";
import { PokemonStat, PokemonTypes } from "../pokemon";
import { Button } from "../UI/Button/Button";

import styles from "./PokemonCard.module.css";

interface PokemonCardProps {
  id: Pokemon["id"];
  onCloseModal: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
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

  const pokemonStats = pokemon.stats.map((stat) => {
    const transformedStatName = transformStatName(stat.stat.name);

    return `${transformedStatName}: ${stat.base_stat}`;
  });

  const pokemonAbilities = pokemon.abilities.map(({ ability }) =>
    transformStatName(ability.name)
  );

  return (
    <div className={styles.pokemonCard}>
      <div className={styles.cardTop}>
        <div>
          <p className={styles.cardTitle}>{transformStatName(pokemon.name)}</p>
          <p>{getPokemonId(String(pokemon.id))}</p>
        </div>
        <button className={styles.closeBtn} onClick={() => onCloseModal()}>
          <IoMdClose size={20} />
        </button>
      </div>

      <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />

      <PokemonTypes types={pokemon.types} />

      <div className={styles.info}>
        <PokemonStat title="Stats" stats={pokemonStats} />
        <PokemonStat title="Abilities" stats={pokemonAbilities} />
      </div>

      {user.pokemons.length < 7 && (
        <Button
          variant="red"
          onClick={() =>
            addPokemon.mutate({
              collection: "users",
              data: {
                ...user,
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
      <Button variant="blue" onClick={openPageHandler}>
        Open
      </Button>
    </div>
  );
};
