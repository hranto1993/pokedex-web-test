import {IPokemonData} from '~/store/main/types';

import styles from './Description.module.scss';

const MAX = 255;

type TDescriptionProps = {
  featuresList: IPokemonData;
};

const Description: React.FC<TDescriptionProps> = ({featuresList}) => {
  const {weight, height, types, abilities, stats, text} = featuresList;

  const type = types?.map((type) => (
    <div key={type.type.name}>{type.type.name}</div>
  ));

  const ability = abilities
    ?.slice(0, 2)
    .map((item) => <div key={item.ability.name}>{item.ability.name}</div>);

  const percent = stats?.map((stat) => (
    <div className={styles.percent} key={stat.stat.name}>
      <div className={styles.percent__name}>{stat.stat.name}</div>
      <div className={styles.percent__wrapper}>
        <div
          className={styles.percent__box}
          style={{width: ` ${Math.round((stat.base_stat / MAX) * 100)}%`}}>
          <p>{Math.round((stat.base_stat / MAX) * 100)} %</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h2 className={styles.title}>Description</h2>
      <p className={styles.text}>{text}</p>
      <div className={styles.container}>
        <div className={styles.container__item}>
          <p className={styles.container__item_name}>Weight</p>
          <p className={styles.container__item_info}> {weight}</p>
        </div>
        <div className={styles.container__item}>
          <p className={styles.container__item_name}>Height</p>
          <p className={styles.container__item_info}> {height}</p>
        </div>
        <div className={styles.container__item}>
          <p className={styles.container__item_name}>Types</p>
          <p className={styles.container__item_info}>{type}</p>
        </div>
        <div className={styles.container__item}>
          <p className={styles.container__item_name}>Abilities</p>
          <p className={styles.container__item_info}>{ability}</p>
        </div>
      </div>
      <h2 className={styles.title}>Stats</h2>
      {percent}
    </div>
  );
};
export default Description;
