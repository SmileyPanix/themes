import useDefinedContext from '@/utilities/useDefinedContext';
import {PreviewTypeContext, SetPreviewTypeContext} from './PreviewTypeContext';

const usePreviewType = () => {
  const previewType = useDefinedContext(PreviewTypeContext);
  const setPreviewType = useDefinedContext(SetPreviewTypeContext);

  return {
    previewType,
    setPreviewType,
  };
};

export default usePreviewType;
