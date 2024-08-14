import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { FirstRow } from "./components/FirstRow";
import { SecondRow } from "./components/SecondRow";
import { getDoctorInfo } from "../profile/service";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const doctorId = useSelector((state) => state.auth.docId);

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  return (
    <Box width="100%">
      <FirstRow user={doctorInfo} />
      <SecondRow user={doctorInfo} />
    </Box>
  );
};
