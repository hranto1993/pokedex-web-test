import {IMG_URL} from '~/constants';

import styles from './PokemonImg.module.scss';

type TPokemonImgTypes = {
  id: number;
};

const PokemonImg: React.FC<TPokemonImgTypes> = ({id}) => {
  const bigId = id < 100 ? `0${id}` : id;
  const imgId = id < 10 ? `00${id}` : bigId;

  return (
    <div className={styles.wrapper}>
      <img src={`${IMG_URL}/${imgId}.png`} alt="active_img" />
    </div>
  );
};
export default PokemonImg;
