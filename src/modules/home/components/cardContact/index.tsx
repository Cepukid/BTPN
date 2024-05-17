import React, {useMemo} from 'react';

import {Avatar, HStack, Pressable, Text, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import {IContact} from '@modules/home/screens/homeMain/types';
import {getFirstLetters, getFirtsAndLastWord} from '@utils/commons';

interface IProps {
  item: IContact;
  onPress?: (item: IContact) => void | null;
  onPressEdit?: (item: IContact) => void | null;
  onPressEditDelete?: (item: IContact) => void | null;
}

export default function CardContact(props: IProps) {
  const {item} = props;

  const RenderMain = useMemo(() => {
    return (
      <Pressable
        onPress={() => props?.onPress?.(item)}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        margin="2"
        p="2"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <HStack>
          <Avatar
            bg="green.500"
            source={{
              uri: item?.photo,
            }}>
            {getFirtsAndLastWord(
              getFirstLetters(`${item?.firstName} ${item?.lastName}`),
            )}
          </Avatar>
          <VStack mx="2" flex="1">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              bold
              fontSize="md">{`${item?.firstName} ${item?.lastName}`}</Text>
            <Text fontSize="md">{`Age : ${item?.age} Years`}</Text>
          </VStack>
          <HStack ml="2" space="2">
            <Pressable
              onPress={() => props?.onPressEdit?.(item)}
              p="2"
              justifyContent="center">
              <Icon color="grey" name="edit" size={24} />
            </Pressable>
            <Pressable
              onPress={() => props?.onPressEditDelete?.(item)}
              p="2"
              justifyContent="center">
              <Icon color="grey" name="delete" size={24} />
            </Pressable>
          </HStack>
        </HStack>
      </Pressable>
    );
  }, [item, props]);
  return RenderMain;
}
