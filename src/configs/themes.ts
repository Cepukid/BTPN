import {Theme} from '@react-navigation/native';

type ColorValue = string;
export interface ExtendedTheme extends Theme {
  dark: boolean;
  colors: Theme['colors'] & {
    artboard: ColorValue;
  };
}

const MyTheme: ExtendedTheme = {
  dark: false,
  colors: {
    artboard: '#F5F5F5',
    background: '#FFFFFF',
    card: 'rgb(255, 255, 255)',
    primary: '#FF5D00',
    text: '#11142D',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default MyTheme;
