import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import { CustomButton } from "./CustomButton";
import { Children, isValidElement, cloneElement } from "react";
// import { useSelector } from "react-redux"

export default function CustomModal({
  btnTitle,
  btnIcon,
  title,
  children,
  lgModal,
  ...props
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const getBrandColor = useSelector(state => state.auth?.brandColor)

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      <CustomButton btnText={btnTitle} onClick={onOpen} {...props} />

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={lgModal ? "2xl" : "md"}
      >
        <ModalOverlay />
        <ModalContent sx={{ "border-radius": "14px" }} py={5}>
          <ModalHeader color={"#5C2BA8"} borderBottom="2px solid #f4f4f4">
            {title}
          </ModalHeader>
          <ModalCloseButton
            fontSize="20px"
            mt={5}
            mr={5}
            _focus={{ borderBox: "none" }}
          />
          <ModalBody px={8} py={{ base: 6, md: 4, lg: 6 }}>
            {childrenWithProps}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
