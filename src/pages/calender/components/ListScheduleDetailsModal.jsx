import {
  Avatar,
  Badge,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import FullPageLoader from "../../../components/fullPageLoader";
import { IoCallOutline, IoPersonOutline } from "react-icons/io5";
import { FiMail } from "react-icons/fi";
import { BiTime } from "react-icons/bi";

function ListScheduleDetailsModal({
  showAllDateScheduleModal,
  setShowAllDateScheduleModal,
  getAllDateScheduleLoader,
  allDateScheduleResult,
}) {
  return (
    <Modal
      isOpen={showAllDateScheduleModal}
      onClose={() => setShowAllDateScheduleModal(false)}
      //   isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Schedules list</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody>
          {getAllDateScheduleLoader ? (
            <FullPageLoader h="100%" bg="transparent" />
          ) : allDateScheduleResult?.length > 0 ? (
            allDateScheduleResult.map((data) => {
              return (
                <Stack
                  spacing="15px"
                  direction="row"
                  alignItems={"center"}
                  mb="10px"
                  background="#ededed82"
                  padding="20px"
                  borderRadius="10px"
                  fontSize=".9em"
                >
                  <Avatar
                    name={`${data?.patientId?.[0]?.firstName} ${data?.patientId?.[0]?.lastName}`}
                    src={data?.patientId?.[0]?.image}
                  />
                  <Stack>
                    <Stack direction={"row"} alignItems="center">
                      <BiTime />
                      <Badge variant="solid" bg="#09B5A9">
                        {dayjs(data?.startDate).format("hh:mm a")}
                      </Badge>
                    </Stack>
                    <Stack direction={"row"} alignItems="center">
                      <IoPersonOutline />
                      <Text>
                        {data?.patientId?.[0]?.firstName}{" "}
                        {data?.patientId?.[0]?.lastName}
                      </Text>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack direction={"row"} alignItems="center">
                        <FiMail />
                        <Text>{data?.patientId?.[0]?.email}</Text>
                      </Stack>
                      <Stack direction={"row"} alignItems="center">
                        <IoCallOutline />
                        <Text>{data?.patientId?.[0]?.phoneNumber}</Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })
          ) : (
            <Text>There's currently no schedule available for that day</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ListScheduleDetailsModal;
