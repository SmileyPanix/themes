import immer from 'immer';
import contrast from 'get-contrast';

import setcolours from 'utils/setcolours';

import {
  themeType,
  shadeType,
  themeShadeObjectType,
  actionTypes,
  previewType,
} from 'types';

export type stateType = {
  themes: themeType[];
  filteredThemes: themeType[];
  activeTheme: string;
  isSmallScreenSize: boolean;
  themeShade: shadeType;
  backgroundColour: string;
  previewType: previewType;
};

const titleColours: titleColoursType[] = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'purple',
  'cyan',
  'white',
];

export const getRandomColour = (theme: themeType | undefined): string => {
  if (theme == null) {
    return '';
  }
  const randomisedColours = titleColours.sort(() => Math.random() - 0.5);
  const accessibleColour = randomisedColours.find(
    (titleColour: titleColoursType) =>
      contrast.ratio(theme[titleColour], theme.background) > 4.5
  );
  if (accessibleColour != null) {
    return theme[accessibleColour];
  }
  return theme[titleColours[0]];
};

export const THEME_COLOUR: themeShadeObjectType = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  ANY: 'ANY',
};

export const initialState: stateType = {
  themes: [],
  filteredThemes: [],
  activeTheme: '',
  isSmallScreenSize: window.innerWidth < 768,
  themeShade: THEME_COLOUR.DARK,
  backgroundColour: '#090300',
  previewType: 'console',
};

export const homeReducer = (
  state: stateType,
  action: actionTypes
): stateType => {
  return immer(state, (draftState: stateType) => {
    switch (action.type) {
      case 'LOAD':
        draftState.themes = action.themes;
        if (action.initialTheme != null) {
          const foundTheme = action.themes.find(
            (theme: themeType) => theme.name === action.initialTheme
          );
          if (foundTheme != null) {
            draftState.filteredThemes = action.themes.filter(
              (theme: themeType) => theme.isDark === foundTheme.isDark
            );
            draftState.activeTheme = foundTheme.name;
            draftState.themeShade = foundTheme.isDark ? 'DARK' : 'LIGHT';
            draftState.backgroundColour = foundTheme.background;
          }
        } else {
          // default to DARK, themeShade is already set
          draftState.filteredThemes = action.themes.filter(
            (theme: themeType) => theme.isDark
          );
          draftState.activeTheme = draftState.filteredThemes[0].name;
        }
        setcolours(draftState.themeShade);
        break;
      case 'SET':
        {
          draftState.activeTheme = action.theme;
          // eslint-disable-next-line no-case-declarations
          const theme = state.themes.find(
            (theme) => theme.name === action.theme
          );
          if (theme) {
            draftState.backgroundColour = theme.background;
          }
        }
        break;
      case 'PREV': {
        const currentIndex = state.filteredThemes.findIndex(
          (theme) => theme.name === state.activeTheme
        );
        let theme;
        if (currentIndex === 0) {
          // get last item
          theme = state.filteredThemes[state.filteredThemes.length - 1];
        } else {
          theme = state.filteredThemes[currentIndex - 1];
        }
        draftState.activeTheme = theme.name;
        draftState.backgroundColour = theme.background;
        break;
      }
      case 'NEXT':
        {
          let theme;
          const currentIndex = state.filteredThemes.findIndex(
            (theme) => theme.name === state.activeTheme
          );
          if (currentIndex === state.filteredThemes.length - 1) {
            // get last item
            theme = state.filteredThemes[0];
          } else {
            theme = state.filteredThemes[currentIndex + 1];
          }
          draftState.activeTheme = theme.name;
          draftState.backgroundColour = theme.background;
        }
        break;
      case 'SIZE':
        draftState.isSmallScreenSize = action.isSmallScreenSize;
        break;
      case 'SHADE':
        draftState.themeShade = action.payload;
        if (draftState.themeShade === THEME_COLOUR.DARK) {
          draftState.filteredThemes = state.themes.filter(
            (theme) => theme.isDark
          );
        }
        if (draftState.themeShade === THEME_COLOUR.LIGHT) {
          draftState.filteredThemes = state.themes.filter(
            (theme) => !theme.isDark
          );
        }
        setcolours(draftState.themeShade);
        draftState.activeTheme = draftState.filteredThemes[0].name;
        // eslint-disable-next-line no-case-declarations
        const theme = state.themes.find(
          (theme) => theme.name === draftState.filteredThemes[0].name
        );
        if (theme) {
          draftState.backgroundColour = theme.background;
        }
        break;
      case 'PREVIEW':
        draftState.previewType = action.payload;
        break;
      case 'MORE':
        draftState.isMoreOpen = !state.isMoreOpen;
        break;
      default:
        break;
    }
  });
};
