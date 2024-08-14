import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

function ConfirmBookingModal({
  handleBook,
  loading,
  disabled,
  buttonTitle,
  type,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        mt="20px"
        disabled={disabled}
        width={"100%"}
        _hover={{ bg: "#6027B2" }}
        bg="#6027B2"
        color="#fff"
        onClick={onOpen}
      >
        {buttonTitle || "Book"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {type !== "RESCHEDULE" ? (
            <>
              <ModalHeader color="red">Final Notice</ModalHeader>
              <ModalBody>
                <Text>
                  Kindly confirm the time and date you have choosen. There are
                  limited slot each day.
                  <br />
                  Please do not set an appointment date & time that you are not
                  certain you would be able to meet.
                </Text>
              </ModalBody>
            </>
          ) : (
            <ModalHeader>
              {" "}
              <Text>Are you sure you want to reschedue?</Text>
            </ModalHeader>
          )}

          <ModalFooter>
            <Button
              size="sm"
              color="#fff"
              _hover={{ bg: "#6027B2" }}
              bg="#6027B2"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleBook}
              isLoading={loading}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmBookingModal;
