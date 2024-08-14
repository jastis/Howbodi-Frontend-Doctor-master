import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import { NotificationCard } from "./NotificationCard";

export const NotificationList = ({ data, setRefresh }) => {
  return (
    <Box width={["100%", "100%", "60%"]}>
      {data?.length > 0 ? (
        data?.map((data, i) => {
          return (
            <Box key={i} mb="10px" bg="#F6F4F9" borderRadius={"20px"}>
              <NotificationCard data={data} setRefresh={setRefresh} />
              <Divider />
            </Box>
          );
        })
      ) : (
        <p style={{ textAlign: "center" }}>No notication available</p>
      )}
    </Box>
  );
};
