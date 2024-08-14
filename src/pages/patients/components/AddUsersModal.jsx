import { Box, Button, Divider, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Formcontrol } from "./Formcontrol";
import { AiOutlinePlus } from "react-icons/ai";


export const AddUsersModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        leftIcon={<AiOutlinePlus />}
        bg="#9E8FB5"
        color="#fff"
        borderRadius={"5px"}
        onClick={onOpen}
      >
        Add Patients
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#403058">Add Patients</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex
              direction={["column", "column", "row"]}
              width={"100%"}
              justifyContent="space-between"
              mb="20px"
            >
              <Box width={["100%", "100%", "48%"]}>
                <Formcontrol
                  placeholder={"Enter your name"}
                  name={"name"}
                  type="text"
                />
              </Box>
              <Box width={["100%", "100%", "48%"]}>
                <Formcontrol
                  placeholder={"Enter your email"}
                  name={"email"}
                  type="email"
                />
              </Box>
            </Flex>
            <Flex
              direction={["column", "column", "row"]}
              width={"100%"}
              justifyContent="space-between"
            >
              <Box width={["100%", "100%", "48%"]}>
                <Formcontrol
                  name={"phone number"}
                  placeholder={"Enter your phone number"}
                />
              </Box>
              <Box width={["100%", "100%", "48%"]}>
                <Formcontrol
                  placeholder={"Enter your address"}
                  name="address"
                />
              </Box>
            </Flex>
            <Flex width="100%" justifyContent={"center"} my="30px">
              <Button
                bg="#5C2BA8"
                color="#fff"
                _hover={{ bg: "#5C2BA8" }}
                p="15px 45px"
                textAlign={"center"}
                mr={3}
                onClick={onClose}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
