import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { errorNotifier } from "../../../components/NotificationHandler";
import { withdrawalRequest } from "../services/withdrawalRequest";
// import { AiOutlinePlus } from "react-icons/ai";

export const PaymentRequestModal = ({ doctorInfo }) => {
  const { wallet, accountDetails } = doctorInfo || {};
  const { isOpen, onOpen, onClose } = useDisclosure();

  const doctorId = useSelector((state) => state?.auth?.docId);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = () => {
    const balance = Number(wallet?.balance) || 0;
    const withdrawalAmount = Number(amount) || 0;
    if (withdrawalAmount === 0) return;
    if (
      !accountDetails?.bankName ||
      !accountDetails?.accountNumber ||
      !accountDetails?.accountName
    ) {
      errorNotifier("Bank details not set");
      return;
    }
    if (balance < withdrawalAmount) {
      errorNotifier("You don't have enough funds to widthdraw");
      return;
    }
    if (withdrawalAmount < 5000) {
      errorNotifier(
        "You must have minimum of N5,000, before you can widthdraw"
      );
      return;
    }

    setLoading(true);

    const payload = {
      doctorId,
      amount: Number(amount),
    };
    withdrawalRequest(payload, onClose, setLoading);
  };

  return (
    <>
      <Button
        bg="#F9F5FF"
        _hover={{ bg: "#F9F5FF" }}
        border="1px solid #C8B6E2"
        color="#695B7F"
        w="200px"
        borderRadius={"25px"}
        px="20px"
        mt="10px"
        onClick={onOpen}
        fontSize=".9em"
      >
        Request withdrawal
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent px="30px">
          <ModalHeader color="#403058">
            <Flex width={"100"} justifyContent="space-between" mt="20px">
              <Text>Request withdrawal</Text>
              <Flex fontSize={".8em"}>
                <Text mr="10px">Balance:</Text>
                <Text>&#8358; {wallet?.balance?.toLocaleString()}</Text>
              </Flex>
            </Flex>
          </ModalHeader>

          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Flex
              direction={["column"]}
              width={"100%"}
              justifyContent="space-between"
              mb="20px"
            >
              <Box width={["100%"]}>
                <FormControl>
                  <FormLabel htmlFor={"amount"}>Enter amount</FormLabel>
                  <Input
                    id={"amount"}
                    type="number"
                    placeholder={"Enter Amount"}
                    name={"amount"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Flex>
            <Box>
              <Text color="#403058" fontSize={"16px"} fontWeight={"semibold"}>
                Account details
              </Text>
              <Text color="#686278" fontSize={"14px"}>
                Please verify your account details before clicking submit, if
                you have not set-up your account details please go to your
                profile to set it up.
              </Text>
            </Box>
            <Flex width="100%" justifyContent={"space-between"} mt="20px">
              <Box>
                <Text fontSize={"14px"} color="#686278">
                  Account number:
                </Text>
                <Text fontSize={"16px"} fontWeight="semibold">
                  {accountDetails?.accountNumber || "Not set"}
                </Text>
              </Box>
              <Box>
                <Text fontSize={"14px"} color="#686278">
                  Account name:
                </Text>
                <Text fontSize={"16px"} fontWeight="semibold">
                  {accountDetails?.accountName || "Not set"}
                </Text>
              </Box>
            </Flex>
            <Box my="20px">
              <Text fontSize={"14px"} color="#686278">
                Bank name:
              </Text>
              <Text fontSize={"16px"} fontWeight="semibold">
                {accountDetails?.bankName || "Not set"}
              </Text>
            </Box>
            <Flex width="100%" justifyContent={"center"} my="30px">
              <Button
                bg="#5C2BA8"
                color="#fff"
                _hover={{ bg: "#5C2BA8" }}
                p="15px 55px"
                textAlign={"center"}
                mr={3}
                isLoading={loading}
                onClick={() => handleWithdrawal()}
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
