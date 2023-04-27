import {HomeContainer, PokemonContainer} from '~/containers';

import {DefaultMetaSettings} from '../../constants/metaVars';

import {AppRoute} from './routes.types';

const Routes = [
  {
    path: AppRoute.Home,
    Component: HomeContainer,
    metaSettings: DefaultMetaSettings,
  },
  {
    path: AppRoute.Pokemon,
    Component: PokemonContainer,
    metaSettings: DefaultMetaSettings,
  },
] as const;

export default Routes;
