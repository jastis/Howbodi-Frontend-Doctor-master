import {
  Input,
  InputGroup,
  // InputRightElement,
  Box,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { BiSearch } from "react-icons/bi";

export const SearchBar = ({ placeholder, setSearchTerm }) => {
  const [s, setS] = useState("");
  const sendSearchData = (search) => {
    setSearchTerm(search);
  };
  return (
    <Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents="cursor"
          children={
            <BiSearch
              color="#c4c4c4"
              fontSize="20"
              // onClick={() => handleSearch(inputValue)}
            />
          }
        />
        <Input
          _placeholder={{ color: "grey" }}
          type="text"
          placeholder={placeholder}
          value={s}
          onChange={(e) => {
            setS(e.target.value);
            sendSearchData(e.target.value);
          }}
          borderRadius="25px"
          size="sm"
          bg="#f9f9f9"
        />
      </InputGroup>
    </Box>
  );
};
