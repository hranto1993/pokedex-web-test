import {Link} from 'react-router-dom';

import './Evolution.scss';
import {IMG_URL} from '~/constants';
import {IEvolutionChain} from '~/store/main/types';

type TEvolutionProps = {
  evolution: IEvolutionChain;
};

const Evolution: React.FC<TEvolutionProps> = ({evolution}) => {
  const {
    evolutionFirst,
    evolutionSecond,
    evolutionThird,
    idFirst,
    idSecond,
    idThird,
  } = evolution;

  const formatId = (id: string) => {
    if (Number(id) < 10) {
      return `00${id}`;
    } else if (Number(id) < 100) {
      return `0${id}`;
    } else {
      return id;
    }
  };

  return (
    <div>
      <div className="header_evolution">Evolutions</div>
      <div className="cards_container">
        <div className="evolution">
          <Link to={`/pokemon/${idFirst}`}>
            <div className="evolution__imgContainer">
              <img
                src={`${IMG_URL}/${formatId(idFirst)}.png`}
                className="pokemon_img"
                alt={evolutionFirst}
              />
            </div>
          </Link>
          <h3 className="name">{evolutionFirst}</h3>
          <p className="id">{'#' + formatId(idFirst)}</p>
        </div>
        <div className="arrow_cont">
          <div className="arrow"></div>
        </div>
        <div className="evolution">
          <Link to={`/pokemon/${idSecond}`}>
            <div className="evolution__imgContainer">
              <img
                src={`${IMG_URL}/${formatId(idSecond)}.png`}
                className="pokemon_img"
                alt={evolutionSecond}
              />
            </div>
          </Link>
          <h3 className="name">{evolutionSecond}</h3>
          <p className="id">{'#' + formatId(idSecond)}</p>
        </div>

        {idThird ? (
          <div className="arrow_cont">
            <div className="arrow"></div>
          </div>
        ) : null}

        {idThird ? (
          <div className="evolution">
            <Link to={`/pokemon/${idThird}`}>
              <div className="evolution__imgContainer">
                <img
                  src={`${IMG_URL}/${formatId(idThird)}.png`}
                  className="pokemon_img"
                  alt={evolutionThird}
                />
              </div>
            </Link>
            <h3 className="name">{evolutionThird}</h3>
            <p className="id">{'#' + formatId(idThird)}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Evolution;
