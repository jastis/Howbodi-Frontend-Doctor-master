import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { TableBody } from "./components/TableBody";
import { PaginatedTable } from "../../components/PaginatedTable";
import { tableHeadData } from "./components/tableHeadData";
import { TestRow } from "./components/TestRow";
import { getPatients, searchUser } from "./service";
import { useSelector } from "react-redux";
import FullPageLoader from "../../components/fullPageLoader";
import debounce from "lodash.debounce";
export const Patients = () => {
  const doctorId = useSelector((state) => state.auth?.docId);
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (keyword) => {
    searchUser(keyword, setFilteredUsers, doctorId);
  };

  useEffect(() => {
    getPatients(doctorId)
      .then((data) => {
        setPatients({ ...data });
      })
      .catch((e) => {
        return null;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [doctorId]);

  //wait for user to finish typing before sending request
  const processSearch = debounce((res) => handleSearch(res), 1000);

  return loading ? (
    <FullPageLoader />
  ) : (
    <Flex
      w="100%"
      direction={["column", "column", "column"]}
      justifyContent="space-between"
      p="10px"
    >
      <TestRow
        dataRow={patients || []}
        total={patients?.totalPatients}
        searchTerm={searchTerm}
        setSearchTerm={(search) => {
          setSearchTerm(search);
          processSearch(search);
        }}
        handleSearch={handleSearch}
      />

      <PaginatedTable
        tableSize={"md"}
        bg="#EFEDF3"
        columns={tableHeadData}
        // updateTable={paginate}

        data={
          <TableBody
            getData={
              filteredUsers?.length > 0
                ? filteredUsers
                : patients?.patients || []
            }
          />
        }
        // setRefresh={getData}
        length={patients?.patients?.length}
        total={patients?.totalPatients}
        updateTable={(page) =>
          getPatients(doctorId, page)
            .then((data) => {
              setPatients({ ...data });
            })
            .catch((e) => {
              return null;
            })
            .finally(() => {
              setLoading(false);
            })
        }
      />
    </Flex>
  );
};
