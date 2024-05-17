import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, FormControl, Input, Modal} from 'native-base';
import {ErrorIContact, IContact} from '@modules/home/screens/homeMain/types';
import {trim} from 'lodash';
import {isValidUrl} from '@utils/commons';
interface IProps {
  onSubmit: (item: IContact) => void | null;
  visible: boolean;
  onClose: () => void | null;
  item: IContact;
}

export default function ModalUpdateContact(props: IProps) {
  const [contact, setContact] = useState<IContact>(props?.item);
  useEffect(() => {
    setContact(props?.item);
    setError({});
  }, [props?.item, props.visible]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const updateContactProperty = useCallback(
    (property: keyof IContact, value: string | number) => {
      setContact(prevContact => {
        if (prevContact) {
          return {
            ...prevContact,
            [property]: typeof value === 'string' ? trim(value) : value,
          };
        }
        return prevContact;
      });
    },
    [],
  );
  const [error, setError] = useState<ErrorIContact>({});
  const handleError = useCallback(
    (property: keyof ErrorIContact, value: string | number) => {
      setError(prevError => {
        if (prevError) {
          return {
            ...prevError,
            [property]: value,
          };
        }
        return prevError;
      });
    },
    [],
  );
  const validatation = useCallback(
    (item: IContact) => {
      const {firstName, photo, lastName, age} = item;
      if (!firstName) {
        handleError('firstName', 'A first name is required');
      }
      if (!photo) {
        handleError('photo', 'Photo URL is required');
      }
      if (!lastName) {
        handleError('lastName', 'A last name is required');
      }
      if (
        isNaN(age as number) ||
        (age as number) <= 0 ||
        (age as number) >= 90
      ) {
        handleError('age', 'Age must be a number between 1 and 90.');
        return false;
      }
      if (!isValidUrl(photo as string)) {
        handleError('photo', 'Photo URL is not valid');
      }
      return true;
    },
    [handleError],
  );
  const handleSubmit = useCallback(
    (item: IContact) => {
      setError({});
      if (validatation?.(item)) {
        setError({});
        props?.onSubmit?.(contact);
      }
    },
    [contact, props, validatation],
  );
  const RenderMain = useMemo(() => {
    return (
      <>
        <Modal
          isOpen={props?.visible}
          onClose={() => props?.onClose?.()}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Update Contact</Modal.Header>
            <Modal.Body>
              <FormControl isRequired isInvalid={'firstName' in error}>
                <FormControl.Label>First Name</FormControl.Label>
                <Input
                  ref={initialRef}
                  value={contact?.firstName}
                  onChangeText={value =>
                    updateContactProperty('firstName', value)
                  }
                />
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                  }}>
                  {error?.firstName}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mt="3" isRequired isInvalid={'lastName' in error}>
                <FormControl.Label>Last Name</FormControl.Label>
                <Input
                  value={contact?.lastName}
                  onChangeText={value =>
                    updateContactProperty('lastName', value)
                  }
                />
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                  }}>
                  {error?.lastName}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mt="3" isRequired isInvalid={'age' in error}>
                <FormControl.Label>Age</FormControl.Label>
                <Input
                  value={contact?.age?.toString?.()}
                  onChangeText={value => updateContactProperty('age', value)}
                  keyboardType="numeric"
                />
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                  }}>
                  {error?.age}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl mt="3" isRequired isInvalid={'photo' in error}>
                <FormControl.Label>Photo</FormControl.Label>
                <Input
                  value={contact?.photo}
                  onChangeText={value => updateContactProperty('photo', value)}
                />
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: 'xs',
                  }}>
                  {error?.photo}
                </FormControl.ErrorMessage>
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    props?.onClose?.();
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    handleSubmit(contact);
                  }}>
                  Update
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  }, [contact, error, handleSubmit, props, updateContactProperty]);
  return RenderMain;
}
