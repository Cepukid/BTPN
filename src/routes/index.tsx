import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

/**
    prefix penamaan pake nama module contoh => NamaModulesNamaScreen = AuthLogin
*/

enum ROUTERS {
  Home = 'Home',
}

export type RootStactNavigationTypes = {
  [ROUTERS.Home]: undefined;
};

const Stack = createStackNavigator<RootStactNavigationTypes>();
const {Navigator} = Stack;
const {Screen} = Stack;

export {Stack, NavigationContainer, Navigator, Screen, ROUTERS};
