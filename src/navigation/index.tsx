import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {isReadyRef, navigationRef} from 'react-navigation-helpers';
import {UIManager, Platform, LayoutAnimation} from 'react-native';
import {Themes} from '@configs/index';
import RootNavigator from './rootNavigator';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

function Navigation() {
  return (
    <NavigationContainer
      theme={Themes}
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
