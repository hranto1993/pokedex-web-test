import React, {useEffect} from 'react';

import {
  PerPage,
  SearchBar,
  Pagination,
  PokemonCard,
  SelectTypes,
} from '~/components';
import {MainSelectors} from '~/store/main/selectors';
import {useAppDispatch, useAppSelector} from '~/libraries/redux';
import {getPokemonList, getPokemonTypes} from '~/store/main/actions';

import styles from './Home.module.scss';

const HomeContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {data, types, initialList} = useAppSelector(MainSelectors.pokemonList);
  const {page, offset} = useAppSelector(MainSelectors.controls);

  const pageOffset = page * offset;
  const pageLimit = pageOffset + offset;

  useEffect(() => {
    dispatch(getPokemonList());
    dispatch(getPokemonTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPokemonList = data
    ?.slice(pageOffset, pageLimit)
    .map(({id, name}) => <PokemonCard key={id} id={id} name={name} />);

  return (
    <main className="container">
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.controls}>
        <div className={styles.controls__left}>
          <SearchBar pokemonList={data} initialList={initialList} />
          <SelectTypes types={types} />
        </div>
        <PerPage offset={offset} />
      </div>
      <section className={styles.wrapper}>{renderPokemonList}</section>
      {renderPokemonList.length ? (
        <Pagination length={data.length} page={page} offset={offset} />
      ) : (
        <p className={styles.error}>Nothing was found</p>
      )}
    </main>
  );
};

export default HomeContainer;
