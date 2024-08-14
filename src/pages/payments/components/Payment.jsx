import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import dayjs from "dayjs";

export const Payment = ({ getData }) => {
  return (
    <>
      {getData?.map((data, i) => {
        return (
          <Tr
            key={i}
            bg="#fff"
            color="#565758"
            borderBottom="10px solid #f6f4f9"
            borderTopRadius="5px"
            fontWeight="bold"
          >
            <Td fontSize={["1.5em"]}>
              &#8358; {data?.amount?.toLocaleString("en-US")}
            </Td>
            <Td color="#929292" fontSize={["12px"]}>
              {dayjs(data?.createdAt).format("D-MM-YYYY")}
            </Td>

            <Td color="#929292" fontSize={["12px"]}>
              {dayjs(data?.createdAt).format("hh:mm a")}
            </Td>
          </Tr>
        );
      })}

      {/* );
      })} */}
    </>
  );
};
