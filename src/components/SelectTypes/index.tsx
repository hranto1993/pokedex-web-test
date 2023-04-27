import {useState, useRef} from 'react';

import {Downicon} from '~/assets';
import {INameURL} from '~/store/main/types';
import {filterByTypes} from '~/store/main/actions';
import {useAppDispatch} from '~/libraries/redux';
import {useOutsideClick} from '~/hooks';

import styles from './SelectTypes.module.scss';

type TSelectTypesProps = {
  types: INameURL[];
};

const SelectTypes: React.FC<TSelectTypesProps> = ({types}) => {
  const wrapperRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('all');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useOutsideClick(wrapperRef, () => openSuggestionsListHandler());

  const openSuggestionsListHandler = () => {
    setIsOpen(false);
  };

  const handleType = (type: string) => {
    setValue(type);
    dispatch(filterByTypes(type));
    openSuggestionsListHandler();
  };

  const renderItems = types?.slice(0, 19).map((item) => (
    <div
      key={item.id}
      className={styles.wrapper__content__item}
      onClick={() => handleType(item.name)}>
      {item.name}
    </div>
  ));

  const title = value === 'all' ? 'All types' : value;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div role="button" onClick={toggle} className={styles.wrapper__header}>
        <div>{title}</div>
        <Downicon className={styles.wrapper__img} />
      </div>
      {!!isOpen && (
        <div className={styles.wrapper__content}>
          <div
            className={styles.wrapper__content__item}
            onClick={() => handleType('all')}>
            All types
          </div>
          {renderItems}
        </div>
      )}
    </div>
  );
};

export default SelectTypes;
