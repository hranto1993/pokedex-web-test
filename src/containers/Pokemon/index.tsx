import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {MainSelectors} from '~/store/main/selectors';
import {catchPokemonInfo} from '~/store/main';
import {useAppDispatch, useAppSelector} from '~/libraries/redux';
import {getActivePokemon, getEvolution} from '~/store/main/actions';
import {
  Header,
  PokemonImg,
  Description,
  Evolution,
  Spinner,
} from '~/components';

import styles from './Pokemon.module.scss';

const PokemonContainer = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const {data, loading, evolution} = useAppSelector(MainSelectors.pokemonInfo);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    if (id) {
      dispatch(getActivePokemon(Number(id)));
    }

    return () => {
      dispatch(catchPokemonInfo());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data) {
      dispatch(getEvolution(data?.species));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || !evolution) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.loader}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/">
        <button className={styles.link}>← Explore more Pokémon</button>
      </Link>
      <Header id={data?.id} name={data?.name} />
      <div className={styles.wrapper}>
        <PokemonImg id={data?.id} />
        <Description featuresList={data} />
      </div>
      <Evolution evolution={evolution} />
    </div>
  );
};

export default PokemonContainer;
