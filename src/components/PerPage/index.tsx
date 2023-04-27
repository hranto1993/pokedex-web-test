import {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {Downicon} from '~/assets';
import {updateOffset, updatePage} from '~/store/main';
import {useOutsideClick} from '~/hooks';

import styles from './PerPage.module.scss';

const perPageList = [10, 20, 50];

type TPerPageProps = {
  offset: number;
};

const PerPage: React.FC<TPerPageProps> = ({offset}) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const openSuggestionsListHandler = () => {
    setIsActive(false);
  };

  useOutsideClick(wrapperRef, () => openSuggestionsListHandler());

  const dropdown = perPageList.map((el) => (
    <div
      key={el}
      className={styles.dropdown__each}
      onClick={() => {
        dispatch(updateOffset(el));
        dispatch(updatePage(0));
        openSuggestionsListHandler();
      }}>
      {el}
    </div>
  ));

  return (
    <>
      <div className={styles.wrapper}>
        <div>Show per page:</div>
        <div
          className={styles.wrapper__number}
          onClick={toggle}
          ref={wrapperRef}>
          <div>{offset}</div>
          <Downicon className={styles.wrapper__number__img} />
          {isActive ? <div className={styles.dropdown}>{dropdown}</div> : null}
        </div>
      </div>
    </>
  );
};
export default PerPage;
