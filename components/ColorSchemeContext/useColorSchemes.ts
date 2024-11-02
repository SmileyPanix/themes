import {useEffect} from 'react';

import {
  ColorSchemeStateContext,
  SetColorSchemeStateContext,
} from '@/components/ColorSchemeContext/ColorSchemeContext';
import {useDispatchActions} from '@/components/ColorSchemeContext/colorSchemeContextReducer';

import useDefinedContext from '@/utilities/useDefinedContext';
import getColorsForCssVars from '@/utilities/getColorsForCssVars';

const useColorSchemes = () => {
  const colorSchemeState = useDefinedContext(ColorSchemeStateContext);
  const setColorSchemeDispatch = useDefinedContext(SetColorSchemeStateContext);

  const {setActiveColorScheme, setLightness, setNextPrevColorScheme} =
    useDispatchActions(setColorSchemeDispatch);

  useEffect(() => {
    const colorVars = getColorsForCssVars(colorSchemeState.activeColorScheme);
    Object.entries(colorVars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  }, [colorSchemeState.activeColorScheme.name]);

  return {
    colorSchemeState,
    setActiveColorScheme,
    setLightness,
    setNextPrevColorScheme,
  };
};

export default useColorSchemes;
