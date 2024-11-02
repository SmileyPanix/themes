import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const BackgroundColor = (props: Props) => {
  return (
    <div
      style={{
        backgroundColor: '--backgroundColor',
      }}
    >
      {props.children}
    </div>
  );
};

export default BackgroundColor;
