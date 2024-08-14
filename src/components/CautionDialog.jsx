import React from "react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

export default function CautionAlertDialog({
  onContinue,
  button,
  cautionTitle,
  agree,
  disagree,
  ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const BTN = { _focus: { boxShadow: "none" } };

  const handleClick = () => {
    onClose();
    onContinue(true);
  };

  return (
    <>
      <Box onClick={onOpen} {...props}>
        {button}
      </Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{cautionTitle}</AlertDialogHeader>

          <AlertDialogFooter>
            <Button {...BTN} ref={cancelRef} onClick={onClose}>
              {disagree || "No"}
            </Button>
            <Button {...BTN} colorScheme="red" onClick={handleClick} ml={3}>
              {agree || "Yes"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
