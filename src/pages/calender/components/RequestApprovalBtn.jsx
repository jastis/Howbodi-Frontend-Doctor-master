import { Button, Text } from "@chakra-ui/react";

export const RequestApprovalBtn = ({ goToScheduleTab }) => {
  return (
    <Button
      color="#403058"
      _focus={{ boxShadow: "none" }}
      background="#fff"
      _hover={{ background: "#fff" }}
      width="200px"
      maxW="200px"
      onClick={() => goToScheduleTab(1)}
    >
      <Text>Request Approval</Text>
    </Button>
  );
};
