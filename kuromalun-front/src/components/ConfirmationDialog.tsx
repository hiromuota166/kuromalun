import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

interface AlertComponentProps {
  message: string;
  colorScheme: "error" | "info" | "warning" | "success" | "loading";
  isOpen: boolean;
  onClose: () => void;
  showConfirmButtons?: boolean;
  onConfirm?: () => void;
}

const ConfirmationDialog: React.FC<AlertComponentProps> = ({
  message,
  colorScheme,
  isOpen,
  onClose,
  showConfirmButtons = false,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{colorScheme === "warning" ? "Warning" : "Information"}</ModalHeader>
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          {showConfirmButtons ? (
            <>
              <Button colorScheme="red" onClick={onConfirm} mr={3}>
                Yes
              </Button>
              <Button onClick={onClose}>No</Button>
            </>
          ) : (
            <Button onClick={onClose}>Close</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationDialog;
