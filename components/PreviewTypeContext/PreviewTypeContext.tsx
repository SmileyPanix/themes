'use client';

import {Dispatch, ReactNode, createContext, useState} from 'react';

export type PreviewType = 'terminal' | 'chalk';

export const PreviewTypeContext = createContext<PreviewType | undefined>(
  undefined
);
export const SetPreviewTypeContext = createContext<
  Dispatch<PreviewType> | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export const PreviewTypeProvider = (props: Props) => {
  const [previewType, setPreviewType] = useState<PreviewType>('terminal');

  return (
    <PreviewTypeContext.Provider value={previewType}>
      <SetPreviewTypeContext.Provider value={setPreviewType}>
        {props.children}
      </SetPreviewTypeContext.Provider>
    </PreviewTypeContext.Provider>
  );
};
