import {useSelector} from 'react-redux';

import styles from './Header.module.scss';

type THeaderTypes = {
  id: number;
  name: string;
};

const Header: React.FC<THeaderTypes> = ({id, name}) => {
  const bigId = id < 100 ? `0${id}` : id;
  const imgId = id < 10 ? `00${id}` : bigId;

  return (
    <div className={styles.wrapper}>
      <p>{name}</p>
      <p className="id">{'#' + imgId}</p>
    </div>
  );
};

export default Header;
