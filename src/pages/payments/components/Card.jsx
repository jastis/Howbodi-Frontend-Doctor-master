import { Box, Heading, Select, Switch, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ALL_MONTHS } from "../../../app/constants";
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';

export const Card = ({
  bg,
  payment,
  paymetCaption,
  bgSize,
  bgImg,
  bgPosition,
  display,
  handleChange,
}) => {
  const currentYear = dayjs().format("YYYY");
  const currentMonth = dayjs().format("M");
  const [month, setMonth] = useState(currentMonth);

  useEffect(() => {
    handleChange(month, currentYear);
    //eslint-disable-next-line
  }, [month, handleChange]);

  return (
    <Box
      borderRadius={"10px"}
      p="30px"
      bg={bg}
      bgSize={bgSize || "cover"}
      bgImage={bgImg}
      width="100%"
      bgRepeat={"no-repeat"}
      bgPosition={bgPosition || "none"}
    >
      <Select
        border={"none"}
        size="sm"
        color={"#8C78AB"}
        placeholder="Please select"
        width="45%"
        defaultValue={currentMonth}
        onChange={(e) => {
          setMonth(e.target.value);
        }}
        // border={"none"}
      >
        {ALL_MONTHS?.map((month, i) => {
          return (
            <option key={month.name} value={month?.value}>
              {month?.name}
            </option>
          );
        })}
      </Select>
      <Box mt="8px">
        <Heading fontFamily="Gilroy-Bold" color={"#403058"} fontSize={"36px"}>
          &#8358; {payment.toLocaleString()}
        </Heading>
        <Text color={"#9E8FB5"} fontSize=".9em">
          {paymetCaption}
        </Text>
      </Box>
      <Box display={display || "none"} my="35px">
        <Switch id="isChecked" />
      </Box>
    </Box>
  );
};
