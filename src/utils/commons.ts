import {useEffect} from 'react';
import _ from 'lodash';
import {Linking} from 'react-native';

export const useMount = (func: any | undefined) =>
  useEffect(() => func(), [func]);
export function getFirstLetters(sentence: string) {
  const words = _.words(sentence);
  const firstLetters = _.map(words, word => word.charAt(0));

  return firstLetters;
}
export function getFirtsAndLastWord(words: string[]) {
  if (_.size(words) >= 2) {
    return `${_.first(words)}${_.last(words)}`;
  } else {
    return _.take(words, 1);
  }
}
export function isValidUrl(url: string): boolean {
  try {
    Linking.canOpenURL(url);
    return true;
  } catch {
    return false;
  }
}
