import * as React from 'react';
import {UIManager, Platform} from 'react-native';
import {Screen, Navigator, ROUTERS} from '@routes/index';

// #region screen
import * as HOMECREENS from '@modules/home/screens/index';

// #endregion

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * make sure gak ada merah2 di routes ini , klo ada meraha harus di fixing di routes index
 * @returns
 */
function RootNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS !== 'android',
      }}
      initialRouteName={ROUTERS.Home}>
      {/* //#region screen Home */}
      <Screen name={ROUTERS.Home} component={HOMECREENS.HomeScreen} />
      {/* //#end region screen Home */}
    </Navigator>
  );
}

export default React.memo(RootNavigator);
