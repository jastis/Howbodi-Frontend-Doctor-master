import {
  HStack,
  Avatar,
  Stack,
  Text,
  Box,
  Flex,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import CautionAlertDialog from "../../../components/CautionDialog";
import { BiTransferAlt } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import { transferPatient } from "../services/transfer";
import { useSelector } from "react-redux";

export const StaffList = ({ staff, refresh, onClose, bookingId, props }) => {
  const [loading, setLoading] = useState(false);
  const doctorId = useSelector((state) => state.auth.docId);

  const handleTransfer = (docId) => {
    setLoading(true);
    transferPatient(docId, bookingId, setLoading, refresh, onClose);
  };
  return staff?._id !== doctorId ? ( //doctor should not be able to transfer to him/her self
    <HStack pt={3} justify="space-between" alignItems="center" width="100%">
      <Flex alignItems={"center"} width="55%">
        <Avatar name={staff?.name} src={staff?.profilePicture} size="sm" />
        <Stack ml="10px" gridRowGap="0">
          <Tooltip label={staff?.name}>
            <Text fontSize="14px" width="200px" isTruncated>
              {staff?.name}
            </Text>
          </Tooltip>
          <Tooltip label={staff?.specialty}>
            <Text fontSize="12px" mt="0 !important" width="200px" isTruncated>
              {staff?.specialty}
            </Text>
          </Tooltip>
        </Stack>
      </Flex>
      <Text width="25%" fontSize="14px">
        {staff?.available ? "Available" : "Unavailable"}
      </Text>
      {staff?.available ? (
        <Button
          isLoading={loading}
          leftIcon={<BiTransferAlt size="1.1em" />}
          color="#fff"
          _hover={{ bg: staff?.available ? "#5C2BA8" : "grey" }}
          bg={staff?.available ? "#5C2BA8" : "grey"}
          size="xs"
        >
          <CautionAlertDialog
            cautionTitle={`Are you sure you want to transfer this patient to ${staff?.name}?`}
            button="Transfer"
            buttonProps={{
              size: "xs",
              color: "#fff",
              isLoading: loading,
              borderRadius: "3px",
              bg: "#5C2BA8",
            }}
            {...props}
            onContinue={() => handleTransfer(staff?._id)}
          />
        </Button>
      ) : (
        <Box width="20%">
          <CgUnavailable />
        </Box>
      )}
    </HStack>
  ) : null;
};
