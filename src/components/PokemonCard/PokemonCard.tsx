import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { useGetPokemonQuery } from '../../api/hooks';
import { transformStatName } from '../../utils/helpers';

import { PokemonTypes } from './PokemonTypes/PokemonTypes';

import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  id: Pokemon['id'];
  onClose: (id: null) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ id, onClose }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetPokemonQuery({
    params: { id },
  });

  if (isLoading || !data) {
    return null;
  }

  const { data: pokemon } = data;

  const pokemonStats = pokemon.stats.map((stat, index) => {
    const transformedStatName = transformStatName(stat.stat.name);

    return (
      <li className={styles.pokemonCardStat} key={index}>
        {transformedStatName}: {stat.base_stat}
      </li>
    );
  });

  const pokemonAbilities = pokemon.abilities.map(({ ability }, index) => {
    const transformedAbilityName = transformStatName(ability.name);

    return (
      <li className={styles.pokemonCardStat} key={index}>
        <div>{transformedAbilityName}</div>
      </li>
    );
  });

  const closeCardHandler = () => {
    onClose(null);
  };

  return (
    <div className={styles.pokemonCard}>
      <button className={styles.closeBtn} onClick={closeCardHandler}>
        <IoMdClose size={20} />
      </button>
      <img src={pokemon.sprites.front_default ?? ''} alt={pokemon.name} />

      <PokemonTypes types={pokemon.types} />

      <div className={styles.info}>
        <div>
          <h3 className={styles.infoTitle}>Stats</h3>
          <ul>{pokemonStats}</ul>
        </div>
        <div>
          <h3 className={styles.infoTitle}>Abilities</h3>
          <ul>{pokemonAbilities}</ul>
        </div>
      </div>

      <button
        className={styles.openBtn}
        onClick={() => navigate(`pokemon/${id}`)}
      >
        Open
      </button>
    </div>
  );
};
