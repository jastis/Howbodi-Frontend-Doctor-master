import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Circle,
  Stack,
  Text,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";

// import { CustomButton } from "./CustomButton"
// import { Children, isValidElement, cloneElement } from "react"
// import { useSelector } from "react-redux"
import dayjs from "dayjs";
import { MdUpdate } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { format, getDate } from "date-fns";

export function BookedDateInfoModal({
  btnTitle,
  btnIcon,
  // title,
  schedules,
  children,
  lgModal,
  bg,
  color,
  border,
  date,
  activity = {},
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const getBrandColor = useSelector(state => state.auth?.brandColor)

  // const childrenWithProps = Children.map(children, child => {
  //   // Checking isValidElement is the safe way and avoids a TS error too.
  //   if (isValidElement(child)) {
  //     return cloneElement(child, { onClose })
  //   }

  //   return child
  // })

  // const { title, description } = activity
  const STACK_STYLE = {
    direction: "row",
    alignItems: "center",
    spacing: "20px",
  };
  const ICON_STYLE = {
    fontSize: "1.5em",
    color: "#303030",
  };
  const newDate = schedules?.map((schedule) => {
    if (
      format(date, "dd-MM-yyyy") ===
      dayjs(schedule?.startDate).format("DD-MM-YYYY")
    ) {
      return schedule;
    }
    return schedule;
  });
  return (
    <>
      <Circle bg="#5C2BA8" color="#fff" size="100%" p={2} onClick={onOpen}>
        {getDate(date)}
      </Circle>

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={lgModal ? "2xl" : "md"}
      >
        <ModalOverlay />
        <ModalContent sx={{ "border-radius": "14px" }} py={5}>
          <ModalHeader color={"#5C2BA8"} borderBottom="2px solid #f4f4f4">
            Appointment Details
          </ModalHeader>
          <ModalCloseButton
            fontSize="20px"
            mt={5}
            mr={5}
            _focus={{ borderBox: "none" }}
          />
          <ModalBody px={8} py={{ base: 6, md: 4, lg: 6 }}>
            <Stack spacing="20px" color="#595959">
              {schedules?.map((schedule) => {
                if (
                  format(date, "dd-MM-yyyy") ===
                  dayjs(schedule?.startDate).format("DD-MM-YYYY")
                ) {
                  return (
                    <Box key={schedule?._id}>
                      <Stack {...STACK_STYLE}>
                        <GoPrimitiveDot {...ICON_STYLE} />
                        <Text fontWeight="medium">
                          {dayjs(schedule?.startDate).format("ddd-MMM-YYYY")}
                        </Text>
                      </Stack>
                      <Stack {...STACK_STYLE}>
                        <GoPrimitiveDot {...ICON_STYLE} />
                        <Text fontWeight="medium">
                          {schedule?.patientId?.firstName}{" "}
                          {schedule?.patientId?.lastName}
                        </Text>
                      </Stack>
                      <Stack {...STACK_STYLE}>
                        <AiOutlineAlignLeft {...ICON_STYLE} />
                        <Text>{schedule?.patientId?.phoneNumber}</Text>
                      </Stack>
                      <Stack {...STACK_STYLE}>
                        <AiOutlineAlignLeft {...ICON_STYLE} />
                        <Text fontSize="14px">{schedule?.status}</Text>
                      </Stack>
                      <Divider mt="10px" />
                      <Text fontSize="20px" color="#5C2BA8" fontWeight="bold">
                        Tests
                      </Text>
                      <Flex justifyContent="space-between" width="100%">
                        {schedule?.patientId?.tests?.map((test) => {
                          return (
                            <Box key={test?._id}>
                              <Stack {...STACK_STYLE}>
                                <MdUpdate {...ICON_STYLE} />
                                {/* <Text>{dayjs(test?.date).format("DD-MM-YYYY")}</Text> */}
                                <Text>{test?.testName}</Text>
                              </Stack>
                              <Stack {...STACK_STYLE}>
                                <MdUpdate {...ICON_STYLE} />
                                {/* <Text>{dayjs(test?.date).format("DD-MM-YYYY")}</Text> */}
                                <Text>{test?.result}</Text>
                              </Stack>
                              <Stack {...STACK_STYLE}>
                                <MdUpdate {...ICON_STYLE} />
                                <Text>
                                  {dayjs(test?.date).format("DD-MM-YYYY")}
                                </Text>
                              </Stack>
                              <Divider />
                            </Box>
                          );
                        })}
                      </Flex>
                    </Box>
                  );
                }
                return schedule;
              })}
            </Stack>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
