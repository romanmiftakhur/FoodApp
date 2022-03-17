import React from 'react';
import { View, Text} from 'react-native';
import { LogBox } from 'react-native';
import MainTab from './src/navigation/MainTab';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';



export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainTab />
      </PersistGate>
    </Provider>
  )
}