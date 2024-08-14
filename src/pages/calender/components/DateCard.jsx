import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
export const DateCard = ({
  day,
  date,
  month,
  color,
  bg,
  onClick,
  isActive,
  itemId,
  ...props
}) => {
  return (
    <Box
      bg={bg}
      color={color}
      borderRadius={"8px"}
      maxHeight="95px"
      p="20px 29px"
      textAlign={"center"}
      cursor="pointer"
      fontWeight={"bold"}
      {...props}
      onClick={() => {
        onClick(date);
      }}
    >
      <Text fontSize=".9em">{day}</Text>
      <Text fontSize="1.6em" fontWeight={"bold"}>
        {date}
      </Text>
      {isActive && (
        <Stack
          spacing={"4px"}
          direction={"row"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Box borderRadius="50%" width="7px" height="7px" bg="#09B5A9" />
          <Box borderRadius="50%" width="7px" height="7px" bg="#F79256" />
        </Stack>
      )}

      {/* <Text>{month}</Text> */}
    </Box>
  );
};
