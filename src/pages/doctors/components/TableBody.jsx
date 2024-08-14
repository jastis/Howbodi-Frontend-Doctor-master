import React from "react";
import { Text, Tr, Td } from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi"

export const TableBody = ({ getData }) => {
  return (
    <>
      {/* {getData?.map((data) => {
        return ( */}
      {getData.map((data, i) => {
        return (
          <Tr
            // key={nanoid()}
            bg="#fff"
            color="#565758"
            borderBottom="20px solid #fff"
            borderRadius="5px"
            boxShadow="md"
            fontWeight="bold"
          >
            {/* <Td fontSize={["12px", "14px", "16px"]}>
              <Avatar name="Joshua Keju" />
            </Td> */}
            <Td py="10px !important" fontSize={["12px", "14px", "16px"]}>
              {data?.name}
              {/* <Text fontSize="12px" fontWeight="normal" color="#BBBBBB">
                clay@gmail.com
              </Text> */}
            </Td>
            <Td color="#929292" fontSize={["12px", "14px", "16px"]}>
              {data?.phone}
            </Td>

            <Td color="#929292" py="10px !important">
              {data?.email}
            </Td>
            <Td py="10px !important">{data?.resident}</Td>
            <Td py="10px !important" color="#929292">
        
                {data?.specialty}
            </Td>
            <Td py="10px !important" color="#929292">
                    <Text bg="#CAF0F8" borderRadius="25px" py="5px" textAlign={"center"} width="100%">
              {data?.status}
              </Text>
            </Td>
            <Td py={"5px !important"}>
              <BiDotsHorizontalRounded size="26px" cursor={"pointer"} />
            </Td>
          </Tr>
        );
      })}

      {/* );
      })} */}
    </>
  );
};
