import { Avatar, Box, Flex, Stack, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

export const VisitationDetails = ({
  data,
  name,
  frequency,
  time,
  px,
  bg,
  avatar,
  cursor,
}) => {
  return (
    <Flex
      // key={key}
      flexDirection={["column", "column", "column", "row"]}
      justifyContent={"center"}
      alignItems="center"
      // my="10px"
      borderBottom={"1px solid #EFEDF3"}
      py="12px"
      // px={px}
      bg={bg}
      cursor={cursor}
      width="100%"
    >
      <Stack direction={"row"} alignItems="center">
        <Avatar size="sm" src={avatar} name={name} alt={`Picture of ${name}`} />
        <Box>
          <Text fontWeight="bold" color="#403058" fontSize="1.1em">
            {name}
          </Text>

          <Flex
            width="150px"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Tooltip label={frequency}>
              <Text fontSize={"12px"} maxWidth="150px" isTruncated>
                {frequency}
              </Text>
            </Tooltip>
          </Flex>
        </Box>
      </Stack>

      <Box>
        <Text fontSize={".8em"} fontWeight={"bold"} color="#757575">
          {time}
        </Text>
      </Box>
    </Flex>
  );
};
