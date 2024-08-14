import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { StaffList } from "./StaffList";

const TransferModal = ({
  onClose,
  allStaff,
  // pendingGuest,
  refresh,
  bookingId,
  loading,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Stack pos="relative" h="70vh" overflowY="scroll" pr={5}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearch color="#c4c4c4" fontSize="24" />}
        />
        <Input
          type={"text"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter staff name"
          borderRadius="8px"
          bg="gray.100"
        />
      </InputGroup>

      {allStaff &&
        allStaff
          ?.filter((staff) =>
            searchTerm
              ? staff?.name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              : staff
          )
          .map((staff, id) => {
            return (
              <Box key={id}>
                <StaffList
                  // pendingGuest={pendingGuest}
                  staff={staff}
                  refresh={refresh}
                  onClose={() => onClose()}
                  bookingId={bookingId}
                  loading={loading}
                  {...props}
                />
              </Box>
            );
          })}
    </Stack>
  );
};

export default TransferModal;
