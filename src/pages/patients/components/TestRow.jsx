import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "../../../components/SearchBar";
// import { searchUser } from "../service";
// import { ImDownload } from "react-icons/im";
// import { HiOutlineDownload } from "react-icons/hi";
// import { AddUsersModal } from './AddUsersModal';

export const TestRow = ({ searchTerm, handleSearch, setSearchTerm, total }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(false)

  // const handleSearch = (keyword) => {
  //   setSearchTerm(keyword);
  //   searchUser(keyword,setLoading)
  // };
  return (
    <Box bg="inherit">
      <Divider
        style={{ border: "1px solid #d9ceeb" }}
        orientation="horizontal"
      />
      <Flex
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
        alignItems="center"
        // my="20px"
        width="100%"
      >
        <Flex
          w="100%"
          // width={["100%", "100%", "40%"]}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Stack
            flex="1"
            direction={["column", "row"]}
            alignItems="center"
            color="#BBBBBB"
            spacing="20px"
          >
            <Text color="#9E8FB5" fontSize={"3em"} fontWeight={"bold"}>
              {total || 0}
            </Text>
            <Text fontSize=".9em" fontWeight="bold">
              Patients
            </Text>
            <Divider
              style={{ border: "1px solid #d9ceeb", height: "100px" }}
              orientation="vertical"
            />
          </Stack>
          <Stack justifyContent={"center"} alignItems="center" flex="5">
            <SearchBar
              setSearchTerm={setSearchTerm}
              inputValue={searchTerm}
              placeholder="Search patient..."
              w="200px"
              bg="#f9f9f9"
              border="1px solid #fff !important"
              _focus={{ border: "2px solid #3182CE !important" }}
              _placeholder={{ color: "grey !important" }}
            />
          </Stack>
        </Flex>
      </Flex>
      <Divider
        style={{ border: "1px solid #d9ceeb" }}
        orientation="horizontal"
      />
    </Box>
  );
};
