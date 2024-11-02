'use client';

import usePreviewType from '@/components/PreviewTypeContext/usePreviewType';
import JestPreview from '@/components/ColorSchemePreviews/JestPreview';
import ChalkPreview from '@/components/ColorSchemePreviews/ChalkPreview';

import css from './PreviewContainer.module.css';

const PreviewContainer = () => {
  const {previewType} = usePreviewType();
  return (
    <section className={css.container}>
      {previewType === 'terminal' && <JestPreview />}
      {previewType === 'chalk' && <ChalkPreview />}
    </section>
  );
};

export default PreviewContainer;
