import React from "react";
import {  Flex } from "@chakra-ui/react";
import { TableBody } from "./components/TableBody";
import { PaginatedTable } from "../../components/PaginatedTable";
import { tableBodyData } from "./components/tableBodyData";
import { tableHeadData } from "./components/tableHeadData";
import { TestRow } from "./components/TestRow";


export const Doctors = () => {
  return (
    <Flex
      w="100%"
      direction={["column", "column", "column"]}
      justifyContent="space-between"
      p="10px"
    >
      <TestRow />
  
      <PaginatedTable
        columns={tableHeadData}
        bg="#EFEDF3"
        data={
          <TableBody
            getData={tableBodyData}
            // companyCode={companyCode}
            // adminId={adminId}
            // staffs={staffs}
            // updateTable={() => setUpdateTable({})}
          />
        }
        // length={department?.length}
        // updateTable={(page) =>
        //   getDepartment(companyCode, adminId, setLoading, setDepartment, page)
        // }
        checkbox={false}
      />
    </Flex>
  );
};
