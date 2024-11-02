import {ReactNode} from 'react';

import css from './LayoutWrapper.module.css';

type Props = {
  children: ReactNode;
};

const LayoutWrapper = (props: Props) => {
  return <div className={css.container}>{props.children}</div>;
};

export default LayoutWrapper;
