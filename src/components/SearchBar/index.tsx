import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {INameURL} from '~/store/main/types';
import {SearchIcon} from '~/assets';
import {useOutsideClick} from '~/hooks';
import {updateSearchList} from '~/store/main';

import styles from './SearchBar.module.scss';

type TEvolutionProps = {
  pokemonList: INameURL[];
  initialList: INameURL[];
};

const SearchBar: React.FC<TEvolutionProps> = ({pokemonList, initialList}) => {
  const boxRef = useRef(null);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const openBoxToggler = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(boxRef, () => openBoxToggler());

  const filterBySearch = (text: string) => {
    if (text) {
      const filteredList = initialList.filter((item) =>
        item.name.toLowerCase().includes(text?.toLowerCase()),
      );

      return filteredList;
    } else {
      return initialList;
    }
  };

  const searchBox = filterBySearch('')
    .slice(0, 5)
    .map((el) => {
      return (
        <div
          key={el.name}
          className={styles.wrapper__box__item}
          onClick={() => {
            setSearchValue(el.name);
            dispatch(updateSearchList(filterBySearch(el.name)));
            openBoxToggler();
          }}>
          {el.name}
        </div>
      );
    });

  const handleChangeSearch = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value.trim();

    setIsOpen(true);
    dispatch(updateSearchList(filterBySearch(value)));
    setSearchValue(value);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__top} onClick={openBoxToggler}>
          <input
            value={searchValue}
            placeholder="Search by name"
            className={styles.wrapper__input}
            onChange={handleChangeSearch}
          />
          <div className={styles.wrapper__image}>
            <SearchIcon />
          </div>
        </div>
        {isOpen && (
          <div className={styles.wrapper__box} ref={boxRef}>
            {searchBox}
          </div>
        )}
      </div>
    </>
  );
};
export default SearchBar;
