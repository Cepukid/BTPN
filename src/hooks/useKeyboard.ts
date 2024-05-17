import {useMount} from '@utils/commons';
import {useRef, useState} from 'react';
import {Animated, Keyboard, Platform} from 'react-native';

const useKeyboard = () => {
  const height = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardWillShow = (e: {endCoordinates: {height: number}}) => {
    Animated.timing(height, {
      duration: 250,
      toValue: e.endCoordinates.height,
      useNativeDriver: false,
    }).start();
    setKeyboardVisible(true);
  };

  const keyboardWillHide = () => {
    Animated.timing(height, {
      duration: 250,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setKeyboardVisible(false);
  };

  useMount(() => {
    let ShowkeyboardWillShow: any = null;
    let ShowkeyboardWillHide: any = null;

    if (Platform.OS === 'android') {
      ShowkeyboardWillShow = Keyboard.addListener(
        'keyboardDidShow',
        keyboardWillShow,
      );
      ShowkeyboardWillHide = Keyboard.addListener(
        'keyboardDidHide',
        keyboardWillHide,
      );
    } else {
      ShowkeyboardWillShow = Keyboard.addListener(
        'keyboardWillShow',
        keyboardWillShow,
      );
      ShowkeyboardWillHide = Keyboard.addListener(
        'keyboardWillHide',
        keyboardWillHide,
      );
    }

    return () => {
      ShowkeyboardWillShow.remove();
      ShowkeyboardWillHide.remove();
    };
  });

  return {height, keyboardVisible};
};

export default useKeyboard;
