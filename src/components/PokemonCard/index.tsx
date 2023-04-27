import {Link} from 'react-router-dom';

import {IMG_URL} from '~/constants';

import styles from './PokemonCard.module.scss';

type TPokemonCardTypes = {
  id: number;
  name: string;
};

const PokemonCard: React.FC<TPokemonCardTypes> = ({id, name}) => {
  const bigId = id < 100 ? `0${id}` : id;
  const imgId = id < 10 ? `00${id}` : bigId;

  return (
    <div className={styles.wrapper}>
      <Link to={`/pokemon/${id}`}>
        <div className={styles.image__wrapper}>
          <img
            loading="lazy"
            src={`${IMG_URL}/${imgId || 0}.png`}
            alt={name}
            className={styles.image}
          />
        </div>
      </Link>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.subtitle}>{'#' + imgId}</p>
    </div>
  );
};

export default PokemonCard;
