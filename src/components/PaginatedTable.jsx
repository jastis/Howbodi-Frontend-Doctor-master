import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  HStack,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import FullPageLoader from "./fullPageLoader";
import { GrDocumentMissing } from "react-icons/gr";
import { DATA_ROWS } from "../app/constants";

const limit = DATA_ROWS.LIMIT;

export const PaginatedTable = ({
  columns = [],
  data,
  updateTable,
  length = 0,
  total = 0,
  noPagination,
  bg,
  tableSize,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEmpty, setEmpty] = useState(false);
  const [maxPageLimit] = useState(5);

  useEffect(() => {
    if (length < 1 && !noPagination) {
      setEmpty(({}, () => true));
    } else {
      setEmpty(({}, () => false));
    }
  }, [length, noPagination]);

  const NUMBER_OF_PAGES = Math.ceil(Number(total) / DATA_ROWS.LIMIT);

  const getPageNumbers = () => {
    let currentPage = page;
    let p = NUMBER_OF_PAGES >= maxPageLimit ? maxPageLimit : NUMBER_OF_PAGES;
    let start = Math.floor(currentPage / p) * p;
    return new Array(p).fill().map((_, idx) => start + idx + 1); //get range 1-5, 6-10
  };

  const goBack = () => {
    if (page === 0) return;

    setPage((initial) => initial - 1);
    setLoading(true);
    updateTable(page - 1).then(() => setLoading(false));
  };

  const isLastPage = total && limit * (page + 1) >= total;

  const goNext = () => {
    if (!length) {
      return;
    }

    if (length < limit || isLastPage) {
      return;
    }

    setPage((initial) => initial + 1);
    setLoading(true);
    updateTable(page + 1).then(() => setLoading(false));
  };

  const ARROW_STYLE = {
    borderRadius: "10px",
    bg: "transparent",
    _hover: { background: "transparent" },
    _focus: { boxShadow: "none" },
    p: "5px",
    cursor: "pointer",
  };

  const goToPageX = (page) => {
    setLoading(true);
    setPage(page);
    updateTable(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <Box
      overflow="auto"
      h="600px"
      bg={bg || "#fff"}
      p="10px"
      my="20px"
      borderRadius="10px"
      position="relative"
      {...props}
    >
      {loading ? (
        <FullPageLoader h="100%" bg="transparent" />
      ) : (
        <Table size={tableSize || "md"} variant="simple">
          <Thead>
            <Tr>
              {columns?.map((item) => {
                return (
                  <Th py="10px" key={nanoid()}>
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody position="relative" fontSize=".8em">
            {isEmpty ? (
              <Th>
                <Box
                  position="absolute"
                  transform="translate(-50%, 30%)"
                  left="50%"
                >
                  <GrDocumentMissing fontSize="150px" opacity=".05" />
                </Box>
              </Th>
            ) : (
              data
            )}
          </Tbody>
        </Table>
      )}

      {!noPagination && (
        <HStack spacing="2px" justifyContent="flex-end" pr="10px">
          <Text fontSize={".9em"}>
            Showing 1 - {limit} of {NUMBER_OF_PAGES}
          </Text>
          <Button {...ARROW_STYLE} onClick={goBack} disabled={page === 0}>
            <BiChevronLeft />
          </Button>
          <Stack direction="row">
            {getPageNumbers()?.map((pageNumber) => {
              let t = pageNumber - 1;
              return pageNumber <= NUMBER_OF_PAGES ? (
                <Text
                  border="1px solid #8080806b"
                  borderRadius={"5px"}
                  fontSize=".8em"
                  paddingX="7px"
                  cursor={"pointer"}
                  onClick={() => (page === t ? null : goToPageX(t))}
                  bg={page === t ? "#299d8f" : "transparent"}
                  color={page === t ? "#fff" : "#000"}
                >
                  {pageNumber}
                </Text>
              ) : null;
            })}
          </Stack>
          <Button
            {...ARROW_STYLE}
            onClick={goNext}
            disabled={length < limit || isLastPage}
          >
            <BiChevronRight />
          </Button>
        </HStack>
      )}
    </Box>
  );
};
