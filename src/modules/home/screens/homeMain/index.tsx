import React, {useState} from 'react';
import {RefreshControl, SafeAreaView} from 'react-native';

import {Fab, Spinner, Text} from 'native-base';
import {FlashList} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  useCreateContactsMutation,
  useDeleteContactsMutation,
  useGetContactsQuery,
  useUpdateContactsMutation,
} from '@modules/home/services';
import {
  AlertDeleteContact,
  CardContact,
  ModalAddContact,
  ModalUpdateContact,
} from '@modules/home/components';
import Styles from './styles';
import {IContact} from './types';
function App(): React.JSX.Element {
  const {
    data: listContacts,
    isLoading,
    refetch: refetchDataListContacts,
    isFetching,
  } = useGetContactsQuery(1);
  const [createContact] = useCreateContactsMutation();
  const [updateContact] = useUpdateContactsMutation();
  const [deleteContact] = useDeleteContactsMutation();
  const [isOpenModalAddContact, setOpenModalAddContact] =
    useState<boolean>(false);
  const [isOpenModalUpdateContact, setOpenModalUpdateContact] =
    useState<boolean>(false);
  const [isOpenAlertDeleteContact, setOpenAlertDeleteContact] =
    useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<IContact>({});
  const handleAddContact = (item: IContact) => {
    createContact(item)
      .unwrap()
      .then(() => {
        refetchDataListContacts();
        setOpenModalAddContact(false);
      })
      .catch(error => console.log(error));
  };
  const handleUpdateContact = (item: IContact) => {
    updateContact(item)
      .unwrap()
      .then(() => {
        refetchDataListContacts();
        setOpenModalUpdateContact(false);
      })
      .catch(error => console.log(error));
  };
  const handleDeleteContact = (item: IContact) => {
    deleteContact(item?.id as string)
      .unwrap()
      .then(() => {
        refetchDataListContacts();
        setOpenAlertDeleteContact(false);
      })
      .catch(error => console.log(error));
  };
  return (
    <SafeAreaView style={Styles.container}>
      {isLoading ? (
        <Spinner size={'lg'} accessibilityLabel="Loading Contacts" />
      ) : (
        <FlashList<IContact>
          data={listContacts?.data}
          keyExtractor={(item, idx) => item + idx.toString()}
          ListHeaderComponent={
            <Text m="2" fontSize="2xl" bold>
              List Contact
            </Text>
          }
          renderItem={({item}) => (
            <CardContact
              item={item}
              onPressEdit={() => {
                setSelectedContact(item);
                setOpenModalUpdateContact(true);
              }}
              onPressEditDelete={() => {
                setSelectedContact(item);
                setOpenAlertDeleteContact(true);
              }}
            />
          )}
          extraData={listContacts?.data}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetchDataListContacts()}
            />
          }
        />
      )}
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        right={10}
        bottom={50}
        onPress={() => {
          setOpenModalAddContact(true);
        }}
        icon={<Icon color="white" name="plus" size={24} />}
      />
      <ModalAddContact
        onSubmit={item => handleAddContact?.(item)}
        visible={isOpenModalAddContact}
        onClose={() => setOpenModalAddContact(false)}
      />
      <ModalUpdateContact
        onSubmit={(item: IContact) => handleUpdateContact?.(item)}
        visible={isOpenModalUpdateContact}
        onClose={() => setOpenModalUpdateContact(false)}
        item={selectedContact}
      />
      <AlertDeleteContact
        onDelete={(item: IContact) => handleDeleteContact?.(item)}
        visible={isOpenAlertDeleteContact}
        onClose={() => setOpenAlertDeleteContact(false)}
        item={selectedContact}
      />
    </SafeAreaView>
  );
}

export default App;
