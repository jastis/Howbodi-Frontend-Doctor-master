import { Button } from "@chakra-ui/button";
import React from "react";

export const CustomButton = ({ btnText, onClick, bg, ...props }) => {
  return (
    <Button _hover={{ bg: bg }} {...props} onClick={onClick}>
      {btnText}
    </Button>
  );
};
