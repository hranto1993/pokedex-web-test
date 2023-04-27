import {useEffect} from 'react';

import {useAppDispatch} from '~/libraries/redux';
import {updatePage} from '~/store/main';

import styles from './Pagination.module.scss';

type TPaaginationTypes = {
  length: number;
  page: number;
  offset: number;
};

const Pagination: React.FC<TPaaginationTypes> = ({length, page, offset}) => {
  const dispatch = useAppDispatch();

  const paginationList = Math.ceil(length / offset);
  const pageNumbers = Array.from(Array(paginationList).keys());
  const paginationOffset = page > 4 ? page - 3 : 0;
  const paginationLimit = page > 4 ? page + 4 : 7;

  const nextPageGo = () => {
    if (page + 1 < paginationList) {
      dispatch(updatePage(page + 1));
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  };

  const prevPageGo = () => {
    if (page > 0) {
      dispatch(updatePage(page - 1));
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  };

  const renderPaginationItems = pageNumbers
    .slice(paginationOffset, paginationLimit)
    .map((el) => (
      <div
        className={`${styles.container__page} ${page === el && styles.active}`}
        key={el}
        onClick={() => {
          dispatch(updatePage(el));
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}>
        <p>{el + 1}</p>
      </div>
    ));

  useEffect(() => {
    if (page + 1 > paginationList) {
      dispatch(updatePage(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={prevPageGo}
          disabled={page === 0}
          className={styles.container__prev}>
          Prev.
        </button>
        {renderPaginationItems}
        <button
          onClick={nextPageGo}
          disabled={page + 1 >= paginationList}
          className={styles.container__next}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Pagination;
