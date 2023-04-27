export interface INameURL {
  url: string;
  name: string;
  id: number;
}

export enum PokemonGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export type PokemonStatName =
  | 'hp'
  | 'speed'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense';

export enum PokemonAvatarQuality {
  FULL = 'full',
  DETAIL = 'detail',
}

interface IAbilityItem {
  slot: number;
  ability: INameURL;
  is_hidden: boolean;
}

export interface IPokemonTypeItem {
  slot: number;
  type: INameURL;
}

export interface IPokemonStat {
  url: string;
  name: PokemonStatName;
}

export interface IPokemonStatData {
  effort: 1;
  base_stat: number;
  stat: IPokemonStat;
}

export interface IPokemonData {
  id: number;
  name: string;
  height: number | string;
  weight: number | string;
  species: string;
  text: string;
  stats: IPokemonStatData[];
  types: IPokemonTypeItem[];
  abilities: IAbilityItem[];
}

export type TPokemonList = {
  data: INameURL[];
  error: string | null;
  count: number;
  initialList: INameURL[];
  loading: boolean;
  types: INameURL[];
};

export type TPokemonType = {
  pokemon: INameURL;
  slot: number;
};

export type TControls = {
  page: number;
  offset: number;
};

export type IMainInitialState = {
  controls: TControls;
  pokemonList: TPokemonList;
  pokemonInfo: pokemonInfo;
};

export interface IEvolutionChain {
  evolutionFirst: string;
  evolutionSecond: string;
  evolutionThird: string;
  idFirst: string;
  idSecond: string;
  idThird: string;
}

export type pokemonInfo = {
  data: IPokemonData | null;
  evolution?: IEvolutionChain | null;
  loading: boolean;
  error: string | null;
};

export type TFlavorTextEntries = {
  language: {
    name: string;
  };
};

export type TTextEntries = {
  flavor_text_entries: TFlavorTextEntries[];
};
