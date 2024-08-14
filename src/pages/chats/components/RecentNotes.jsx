import { Divider, Stack, Text, Skeleton } from "@chakra-ui/react";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { getPatientProfile } from "../services/getPatientProfile";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const RecentNotes = ({ patientId }) => {
  const { docId } = useSelector((state) => state.auth);
  const [patientProfile, setPatentProfile] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPatientProfile(docId, patientId, setPatentProfile, setIsLoaded);
  }, [patientId, docId]);

  return (
    <Skeleton isLoaded={isLoaded}>
      <Stack p={2} color="#757575" spacing="4" pb="2">
        <Text fontSize="15px" fontWeight="600">
          Recent Notes
        </Text>
        <Divider mt="4px !important" />
        {patientProfile?.data?.patientNotes?.length > 0 ? (
          patientProfile?.data?.patientNotes?.slice(0, 3).map((note) => (
            <Stack key={nanoid()}>
              <Text my="0" fontSize="11px" color="#929292">
                {dayjs(note.createdAt).format("dddd DD MMMM YYYY")}
              </Text>
              <Text fontSize="14px" fontWeight="600" m="0 !important">
                {note?.note}
              </Text>
            </Stack>
          ))
        ) : (
          <Text>No notes available</Text>
        )}
      </Stack>
    </Skeleton>
  );
};

export default RecentNotes;
