import {FC, ReactElement, PropsWithChildren} from 'react';

type TProps = {
  children: ReactElement;
};

export type ReactFCWithChildren = FC<TProps>;

export type FCC<P> = FC<PropsWithChildren<P>>;
