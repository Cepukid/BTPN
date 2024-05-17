import React, {useMemo} from 'react';
import {AlertDialog, Button} from 'native-base';
import {IContact} from '@modules/home/screens/homeMain/types';
interface IProps {
  onDelete: (item: IContact) => void | null;
  visible: boolean;
  onClose: () => void | null;
  item: IContact;
}

export default function AlertDeleteContact(props: IProps) {
  const cancelRef = React.useRef(null);
  const RenderMain = useMemo(() => {
    return (
      <>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={props?.visible}
          onClose={() => props?.onClose?.()}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Delete Contact</AlertDialog.Header>
            <AlertDialog.Body>
              This will remove Contact relating to Alex. This action cannot be
              reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => props?.onClose?.()}
                  ref={cancelRef}>
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => props?.onDelete?.(props?.item)}>
                  Delete
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </>
    );
  }, [props]);
  return RenderMain;
}
