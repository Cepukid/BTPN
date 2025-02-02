import React, {useMemo} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from '@navigation/index';
import {persistor, store} from '@configs/store';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';

const App: React.FC = () => {
  const RenderMain = useMemo(() => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NativeBaseProvider>
              <Navigation />
            </NativeBaseProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }, []);

  return RenderMain;
};
export default App;
